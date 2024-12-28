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
        return ResponseEntity.accepted().body("Resource Added");
    }

    @PostMapping("/update")
    public ResponseEntity<String> updateResource(@RequestBody ResourceDto resourceDto) {
        try {
        return ResponseEntity.accepted().body(resourceService.updateResource(resourceDto));

        }catch (RuntimeException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }
    @GetMapping("/")
    public ResponseEntity<List<ResourceDto>> getAllResources() {
      List<ResourceDto> resources =   resourceService.getResources();
      return ResponseEntity.ok(resources);
    }
    @PostMapping("/delete")
    public ResponseEntity<String> deleteResource(@RequestBody ResourceDto resourceDto) {
        try {
        return ResponseEntity.ok(resourceService.deleteResource(resourceDto));

        }catch (RuntimeException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


}
