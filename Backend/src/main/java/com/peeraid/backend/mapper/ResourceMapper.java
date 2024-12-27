package com.peeraid.backend.mapper;

import com.peeraid.backend.dto.CreateResourceDto;
import com.peeraid.backend.dto.ResourceDto;
import com.peeraid.backend.models.Category;
import com.peeraid.backend.models.Resource;
import com.peeraid.backend.models.Status;

public class ResourceMapper {

    public static ResourceDto mapToResourceDto(Resource resource){
        return new ResourceDto(
                resource.getResourceId(),
                resource.getResourceName(),
                resource.getDescription(),
                resource.getCategory().toString(),
                resource.getStatus().toString(),
                "TO-BE-DECIDED"
        );
    }
    public static  Resource mapToResource(CreateResourceDto createResourceDto){
        Category category = Category.valueOf(createResourceDto.getCategory());
        Status  status = Status.valueOf(createResourceDto.getStatus());
        return new Resource(createResourceDto.getName(),
                            category,
                            createResourceDto.getDescription(),
                            createResourceDto.getImageUrl(),
                            status);
    }
    public static CreateResourceDto mapToCreateResourceDto(Resource resource){
        return new CreateResourceDto(
                resource.getResourceName(),
                resource.getDescription(),
                resource.getCategory().toString(),
                resource.getStatus().toString(),
                "TO-BE-DECIDED"
        );
    }

    public static Resource mapToResource(ResourceDto resourceDto, Resource resource){

        resource.setResourceName(resourceDto.getName());
        resource.setDescription(resourceDto.getDescription());
        resource.setCategory(Category.valueOf(resourceDto.getCategory()));
        resource.setStatus(Status.valueOf(resourceDto.getStatus()));
        resource.setImageUrl(resourceDto.getImageUrl());

        return resource;
    }


}
