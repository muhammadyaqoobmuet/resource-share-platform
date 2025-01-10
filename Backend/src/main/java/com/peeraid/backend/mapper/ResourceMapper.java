package com.peeraid.backend.mapper;

import com.peeraid.backend.dto.CreateResourceDto;
import com.peeraid.backend.dto.ResourceDto;
import com.peeraid.backend.models.ResourceCategory;
import com.peeraid.backend.models.Resource;
import com.peeraid.backend.models.ResourceType;

public class ResourceMapper {

    public static ResourceDto mapToResourceDto(Resource resource){
        return new ResourceDto(
                resource.getResourceId(),
                resource.getResourceName(),
                resource.getDescription(),
                resource.getResourceCategory().toString(),
                resource.getResourceType().toString(),
                resource.getImageUrl(),
                resource.getUser().getUserId(),
                resource.getAvailable(),
                resource.getDateCreated()
        );
    }
    public static  Resource mapToResource(CreateResourceDto createResourceDto) {
        ResourceCategory resourceCategory = ResourceCategory.valueOf(createResourceDto.getCategory());
        ResourceType resourceType = ResourceType.valueOf(createResourceDto.getResourceType());
        return new Resource(createResourceDto.getName(),
                resourceCategory,
                createResourceDto.getDescription(),
                resourceType);

    }

    public static Resource mapToResource(ResourceDto resourceDto, Resource resource){

        resource.setResourceName(resourceDto.getName());
        resource.setDescription(resourceDto.getDescription());
        resource.setResourceCategory(ResourceCategory.valueOf(resourceDto.getCategory()));
        resource.setResourceType(ResourceType.valueOf(resourceDto.getResourceType()));
        resource.setImageUrl(resourceDto.getImageUrl());

        return resource;
    }


}
