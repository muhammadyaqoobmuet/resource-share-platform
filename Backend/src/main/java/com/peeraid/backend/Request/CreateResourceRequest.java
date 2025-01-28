package com.peeraid.backend.Request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CreateResourceRequest {
    private String name;
    private String description;
    private String category;
    private String resourceType;

}
