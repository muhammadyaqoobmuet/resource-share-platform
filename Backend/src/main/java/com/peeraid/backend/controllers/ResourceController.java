package com.peeraid.backend.controllers;

import com.peeraid.backend.dto.CreateResourceDto;
import com.peeraid.backend.dto.ResourceDto;
import com.peeraid.backend.services.ResourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/resource")
public class ResourceController {

    ResourceService resourceService;

    @Autowired
    public ResourceController(ResourceService resourceService) {
        this.resourceService = resourceService;
    }

    @PostMapping("/create")
    public ResponseEntity<String> createResource(@RequestBody CreateResourceDto createResourceDto) {
        resourceService.createResource(createResourceDto);
        return ResponseEntity.ok("Resource Added");
    }

    @PostMapping("/update")
    public ResponseEntity<String> updateResource(@RequestBody ResourceDto resourceDto) {
            return ResponseEntity.ok(resourceService.updateResource(resourceDto));

    }
    @GetMapping("/")
    public ResponseEntity<List<ResourceDto>> getAllResources() {
      List<ResourceDto> resourceDtos =   resourceService.getResources();
      return ResponseEntity.ok(resourceDtos);
    }


}
