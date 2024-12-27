package com.peeraid.backend.services;

import com.peeraid.backend.Repository.ResourceRepo;
import com.peeraid.backend.dto.CreateResourceDto;
import com.peeraid.backend.dto.ResourceDto;
import com.peeraid.backend.mapper.ResourceMapper;
import com.peeraid.backend.models.Resource;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ResourceService {

    ResourceRepo resourceRepo;

    public ResourceService(ResourceRepo resourceRepo) {
        this.resourceRepo = resourceRepo;
    }

    public void createResource(CreateResourceDto createResourceDto) {
        Resource resource = ResourceMapper.mapToResource(createResourceDto);
        resource.setUser(Utill.getCurrentUser());
        resource.setAvailable(true);
        resource.setDateCreated(LocalDateTime.now());

        resourceRepo.save(resource);

    }
    public List<ResourceDto> getResources() {
        List<Resource> resources = resourceRepo.findAllOrderByCreatedDateDesc();

       return resources.stream().map(ResourceMapper::mapToResourceDto).collect(Collectors.toList()) ;

    }

    public String updateResource(ResourceDto resourceDto) {
        Resource resource = resourceRepo.findByResourceId(resourceDto.getId()).orElseThrow(()-> new RuntimeException("Resource not found"));
        if (resource.getUser().getUserId() == Utill.getCurrentUser().getUserId()){
            resource =    ResourceMapper.mapToResource(resourceDto,resource);
            resourceRepo.save(resource);
        }else {
            throw new AuthorizationDeniedException("You do not have permission to update this resource");
        }

            return "Updated Resource Successfully";

    }

}
