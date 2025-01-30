package com.peeraid.backend.services;

import com.peeraid.backend.Repository.ResourceRepo;
import com.peeraid.backend.Request.CreateResourceRequest;
import com.peeraid.backend.dto.ResourceDto;
import com.peeraid.backend.mapper.ResourceMapper;
import com.peeraid.backend.models.entity.Resource;
import com.peeraid.backend.models.entity.User;
import com.peeraid.backend.models.enums.Image;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.CompletableFuture;
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

        // Upload image and wait for the result
        CompletableFuture<Image> imageFuture = imageUpload(file, resource);

        // Block until the image upload completes
        imageFuture.join();

        // Now that the image is uploaded, save the resource
        resource.setUser(Utill.getCurrentUser());
        resourceRepo.save(resource);
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
    protected CompletableFuture<Image> imageUpload(MultipartFile file, Resource resource) throws IOException {
        return cloudinaryService.uploadImage(file).thenApply(image -> {
            // Update resource with image details after upload is complete
            resource.setImageUrl(image.getUrl());
            resource.setImagePublicId(image.getPublicID());
            return image;
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

    public Page<ResourceDto> getMyResources(int page , int size) {
        Pageable pageable = PageRequest.of(page,size);
        User user = Utill.getCurrentUser();
      Page<Resource> resources =   resourceRepo.findAllByUserId(user.getUserId(),pageable);
       return resources.map(ResourceMapper::mapToResourceDto);
    }

    private Resource getResource(long id){
        return resourceRepo.findByResourceId(id)
                 .orElseThrow(()-> new RuntimeException("Resource not found"));
     }
     public Page<ResourceDto> searchResource(String key,int page, int size){
        Pageable pageable = PageRequest.of(page,size);
         Page<Resource> resources =  resourceRepo.searchResource(key,pageable);
         return resources.map(ResourceMapper::mapToResourceDto);
     }

    public Page<ResourceDto> getResources(String type, String category, String status, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("resourceId").descending());

        boolean filterByType = type != null && !type.equalsIgnoreCase("All");
        boolean filterByCategory = category != null && !category.equalsIgnoreCase("All");
        boolean filterByStatus = status != null && !status.equalsIgnoreCase("Any");

        if (filterByType && filterByCategory && filterByStatus) {
            return resourceRepo.getFilteredResource(type, category, status,pageable)
                    .map(ResourceMapper::mapToResourceDto);
        } else if (filterByType && filterByCategory) {
            return resourceRepo.getFilteredByTypeAndCategory(pageable, type, category)
                    .map(ResourceMapper::mapToResourceDto);
        } else if (filterByType && filterByStatus) {
            return resourceRepo.getFilteredByTypeAndStatus(pageable, type, status)
                    .map(ResourceMapper::mapToResourceDto);
        } else if (filterByCategory && filterByStatus) {
            return resourceRepo.getFilteredByCategoryAndStatus(pageable, category, status)
                    .map(ResourceMapper::mapToResourceDto);
        } else if (filterByType) {
            return resourceRepo.getFilteredByType(pageable, type)
                    .map(ResourceMapper::mapToResourceDto);
        } else if (filterByCategory) {
            return resourceRepo.getFilteredByCategory(pageable, category)
                    .map(ResourceMapper::mapToResourceDto);
        } else if (filterByStatus) {
            return resourceRepo.getFilteredByStatus(pageable, status)
                    .map(ResourceMapper::mapToResourceDto);
        } else {
            return resourceRepo.findAll(pageable).map(ResourceMapper::mapToResourceDto);
        }
    }


}
