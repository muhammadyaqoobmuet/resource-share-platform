package com.peeraid.backend.services;

import com.peeraid.backend.Repository.ResourceRepo;
import com.peeraid.backend.Request.CreateResourceRequest;
import com.peeraid.backend.dto.ResourceDto;
import com.peeraid.backend.mapper.ResourceMapper;
import com.peeraid.backend.models.Image;
import com.peeraid.backend.models.Resource;
import com.peeraid.backend.models.User;
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
        Image image =  cloudinaryService.uploadImage(file);
        Resource resource = ResourceMapper.mapToResource(createResourceRequest);
        resource.setUser(Utill.getCurrentUser());
        resource.setImageUrl(image.getUrl());
        resource.setImagePublicId(image.getPublicID());
        resourceRepo.save(resource);

    }
    public List<ResourceDto> getResources() {

        List<Resource> resources = resourceRepo.findAllOrderByCreatedDateDesc();

       return resources.stream().map(ResourceMapper::mapToResourceDto).collect(Collectors.toList()) ;

    }

    public String updateResource(ResourceDto resourceDto, MultipartFile file) throws IOException {
        Resource resource = getResource(resourceDto.getId());

        if (resource.getUser().getUserId() == Utill.getCurrentUser().getUserId()){
          String url =   cloudinaryService.updateImage(file,resource.getImagePublicId());
            resource =    ResourceMapper.mapToResource(resourceDto,resource);
            resource.setImageUrl(url);
            resourceRepo.save(resource);
        }else {
        throw new AccessDeniedException("You do not have permission to update this resource");
        }

            return "Updated Resource Successfully";

    }

    public String deleteResource(long id) throws IOException {
        Resource resource = getResource(id);
        if (resource.getUser().getUserId() == Utill.getCurrentUser().getUserId()){
            cloudinaryService.deleteImage(resource.getImagePublicId());
            resourceRepo.delete(resource);
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
