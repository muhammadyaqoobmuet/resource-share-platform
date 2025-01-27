package com.peeraid.backend.Request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateResourceRequest {
    private String name;
    private String description;
    private String category;
    private String resourceType;

}
