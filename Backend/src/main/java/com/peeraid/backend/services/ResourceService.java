package com.peeraid.backend.services;

import com.peeraid.backend.Repository.ResourceRepo;
import com.peeraid.backend.dto.CreateResourceDto;
import com.peeraid.backend.dto.ResourceDto;
import com.peeraid.backend.mapper.ResourceMapper;
import com.peeraid.backend.models.Image;
import com.peeraid.backend.models.Resource;
import org.springframework.security.authorization.AuthorizationDeniedException;
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

    public void createResource(CreateResourceDto createResourceDto,MultipartFile file) throws IOException {

        Image image =  cloudinaryService.uploadImage(file);
        Resource resource = ResourceMapper.mapToResource(createResourceDto);
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
        Resource resource = resourceRepo.findByResourceId(resourceDto.getId())
                .orElseThrow(()-> new RuntimeException("Resource not found"));

        if (resource.getUser().getUserId() == Utill.getCurrentUser().getUserId()){
          String url =   cloudinaryService.updateImage(file,resource.getImagePublicId());
            resource =    ResourceMapper.mapToResource(resourceDto,resource);
            resource.setImageUrl(url);
            resourceRepo.save(resource);
        }else {
            throw new AuthorizationDeniedException("You do not have permission to update this resource");
        }

            return "Updated Resource Successfully";

    }

    public String deleteResource(ResourceDto resourceDto) throws IOException {
        Resource resource = resourceRepo.findByResourceId(resourceDto.getId())
                        .orElseThrow(()-> new RuntimeException("Resource not found"));
        if (resource.getUser().getUserId() == Utill.getCurrentUser().getUserId()){
            cloudinaryService.deleteImage(resource.getImagePublicId());
            resourceRepo.delete(resource);
        }else {
            throw  new AuthorizationDeniedException("You do not have permission to delete this resource");
        }
        return "Deleted Resource Successfully";

    }

}
