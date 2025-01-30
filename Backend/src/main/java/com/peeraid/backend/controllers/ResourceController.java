package com.peeraid.backend.controllers;

import com.peeraid.backend.Request.CreateResourceRequest;
import com.peeraid.backend.dto.ResourceDto;
import com.peeraid.backend.services.ResourceService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequestMapping("/resource")
public class ResourceController {

    ResourceService resourceService;


    public ResourceController(ResourceService resourceService) {
        this.resourceService = resourceService;
    }

    @PostMapping("/create")
    public ResponseEntity<String> createResource(@RequestPart CreateResourceRequest resource, @RequestPart MultipartFile image) {
        try {
            resourceService.createResource(resource, image);
            return new ResponseEntity<>("Resource Created", HttpStatus.CREATED);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @PutMapping("/update")
    public ResponseEntity<String> updateResource(@RequestPart ResourceDto resource, @RequestPart MultipartFile image) {
        try {
            return ResponseEntity.accepted().body(resourceService.updateResource(resource, image));

        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    //    @GetMapping("/")
//    public ResponseEntity<Page<ResourceDto>> getAllResources(@RequestParam(defaultValue = "0") int page,
//                                                             @RequestParam(defaultValue = "5") int size) {
//      Page<ResourceDto> resources =   resourceService.getResources(page,size);
//      return ResponseEntity.ok(resources);
//    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteResource(@PathVariable("id") long id) {
        try {
            return ResponseEntity.ok(resourceService.deleteResource(id));

        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getResourceById(@PathVariable("id") long id) {
        try {
            return new ResponseEntity<>(resourceService.getResourcesById(id), HttpStatus.OK);

        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

    @GetMapping("/me")
    public ResponseEntity<Page<ResourceDto>> getMyResources(@RequestParam(defaultValue = "0") int page,
                                                            @RequestParam(defaultValue = "10") int size) {
        try {
            return ResponseEntity.ok(resourceService.getMyResources(page, size));
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/search")
    public ResponseEntity<Page<ResourceDto>> searchResource(@RequestParam String keyword,
                                                            @RequestParam(defaultValue = "0") int page,
                                                            @RequestParam(defaultValue = "10") int size) {
        try {
            return ResponseEntity.ok(resourceService.searchResource(keyword, page, size));
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/")
    public ResponseEntity<Page<ResourceDto>> getAllResources(
            @RequestParam(defaultValue = "All") String type,
            @RequestParam(defaultValue = "All") String category,
            @RequestParam(defaultValue = "Any") String status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        try {
            Page<ResourceDto> resources = resourceService.getResources(type, category, status, page, size);
            return ResponseEntity.ok(resources);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
}



