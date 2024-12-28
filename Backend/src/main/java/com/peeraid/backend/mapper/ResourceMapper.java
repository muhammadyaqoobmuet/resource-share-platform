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
                "TO-BE-DECIDED"
        );
    }
    public static  Resource mapToResource(CreateResourceDto createResourceDto){
        ResourceCategory resourceCategory = ResourceCategory.valueOf(createResourceDto.getCategory());
        ResourceType resourceType = ResourceType.valueOf(createResourceDto.getStatus());
        return new Resource(createResourceDto.getName(),
                resourceCategory,
                            createResourceDto.getDescription(),
                            createResourceDto.getImageUrl(),
                resourceType);
    }
    public static CreateResourceDto mapToCreateResourceDto(Resource resource){
        return new CreateResourceDto(
                resource.getResourceName(),
                resource.getDescription(),
                resource.getResourceCategory().toString(),
                resource.getResourceType().toString(),
                "TO-BE-DECIDED"
        );
    }

    public static Resource mapToResource(ResourceDto resourceDto, Resource resource){

        resource.setResourceName(resourceDto.getName());
        resource.setDescription(resourceDto.getDescription());
        resource.setResourceCategory(ResourceCategory.valueOf(resourceDto.getCategory()));
        resource.setResourceType(ResourceType.valueOf(resourceDto.getStatus()));
        resource.setImageUrl(resourceDto.getImageUrl());

        return resource;
    }


}
