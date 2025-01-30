package com.peeraid.backend.services;

import com.peeraid.backend.Repository.ResourceRepo;
import com.peeraid.backend.Request.CreateResourceRequest;
import com.peeraid.backend.dto.ResourceDto;
import com.peeraid.backend.mapper.ResourceMapper;
import com.peeraid.backend.models.entity.Resource;
import com.peeraid.backend.models.entity.User;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ResourceService {

    ResourceRepo resourceRepo;
    CloudinaryService cloudinaryService;

    public ResourceService(ResourceRepo resourceRepo, CloudinaryService cloudinaryService) {
        this.resourceRepo = resourceRepo;
        this.cloudinaryService = cloudinaryService;
    }

    public void createResource(CreateResourceRequest createResourceRequest, MultipartFile file) throws IOException {
        Resource resource = ResourceMapper.mapToResource(createResourceRequest);
        imageUpload(file,resource);//upload image asynchronously
        resource.setUser(Utill.getCurrentUser());
        resourceRepo.save(resource);


    }


    public List<ResourceDto> getResources() {

        List<Resource> resources = resourceRepo.findAllOrderByCreatedDateDesc();

       return resources.stream().map(ResourceMapper::mapToResourceDto).collect(Collectors.toList()) ;

    }

    public String updateResource(ResourceDto resourceDto, MultipartFile file) throws IOException {
        Resource resource = getResource(resourceDto.getId());

        if (resource.getUser().getUserId() == Utill.getCurrentUser().getUserId()){
            resource =    ResourceMapper.mapToResource(resourceDto,resource);
            imageUpdate(file,resource);
            resourceRepo.save(resource);
        }else {
        throw new AccessDeniedException("You do not have permission to update this resource");
        }

            return "Updated Resource Successfully";

    }
    @Async
    protected void imageUpload(MultipartFile file, Resource resource) throws IOException {
        cloudinaryService.uploadImage(file).thenAccept(image -> {
            resource.setImageUrl(image.getUrl());
            resource.setImagePublicId(image.getPublicID());
            resourceRepo.save(resource); // Save the resource after updating its image details
        }).exceptionally(ex -> {
            System.err.println("Error during image upload: " + ex.getMessage());
            return null;
        });
    }
    @Async
    public void imageUpdate(MultipartFile file, Resource resource) throws IOException {
        if (resource.getImagePublicId() == null || resource.getImagePublicId().isEmpty()) {
            // If no public ID exists, treat it as a new upload
            imageUpload(file, resource);
            return;
        }

        cloudinaryService.updateImage(file, resource.getImagePublicId())
                .thenAccept(url -> {
                    resource.setImageUrl(url);
                    resourceRepo.save(resource); // Save the updated resource
                }).exceptionally(ex -> {
                    System.err.println("Error during image update: " + ex.getMessage());
                    return null;
                });
    }

    @Async
    protected void deleteImage(String imagePublicId) throws IOException {
        cloudinaryService.deleteImage(imagePublicId);
    }

    public String deleteResource(long id) throws IOException {
        Resource resource = getResource(id);
        if (resource.getUser().getUserId() == Utill.getCurrentUser().getUserId()){
            resourceRepo.delete(resource);
            deleteImage(resource.getImagePublicId());
        }else {
            throw  new AccessDeniedException("You do not have permission to delete this resource");
        }
        return "Deleted Resource Successfully";

    }

    public ResourceDto getResourcesById(long id) {
        Resource resource = getResource(id);
        return ResourceMapper.mapToResourceDto(resource);
    }

    public List<ResourceDto> getMyResources() {
        User user = Utill.getCurrentUser();
      List<Resource> resources =   resourceRepo.findAllByUserId(user.getUserId());
       return resources.stream().map(ResourceMapper::mapToResourceDto).collect(Collectors.toList());
    }

    private Resource getResource(long id){
        return resourceRepo.findByResourceId(id)
                 .orElseThrow(()-> new RuntimeException("Resource not found"));
     }


}
