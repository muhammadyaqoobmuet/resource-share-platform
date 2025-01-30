package com.peeraid.backend.mapper;

import com.peeraid.backend.Request.CreateResourceRequest;
import com.peeraid.backend.dto.ResourceDto;
import com.peeraid.backend.models.enums.ResourceCategory;
import com.peeraid.backend.models.entity.Resource;
import com.peeraid.backend.models.enums.ResourceType;

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
                resource.getResourceStatus().toString(),
                resource.getDateCreated()
        );
    }
    public static  Resource mapToResource(CreateResourceRequest createResourceRequest) {
        ResourceCategory resourceCategory = ResourceCategory.valueOf(createResourceRequest.getCategory());
        ResourceType resourceType = ResourceType.valueOf(createResourceRequest.getResourceType());
        return new Resource(createResourceRequest.getName(),
                resourceCategory,
                createResourceRequest.getDescription(),
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
