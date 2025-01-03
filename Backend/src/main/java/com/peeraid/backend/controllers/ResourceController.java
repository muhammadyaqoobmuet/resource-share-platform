package com.peeraid.backend.controllers;

import com.peeraid.backend.dto.CreateResourceDto;
import com.peeraid.backend.dto.ResourceDto;
import com.peeraid.backend.services.CloudinaryService;
import com.peeraid.backend.services.ResourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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
    public ResponseEntity<String> createResource(@RequestPart("resource") CreateResourceDto createResourceDto,
                                                 @RequestPart("file") MultipartFile file) {
       try {
            resourceService.createResource(createResourceDto,file);
            return new ResponseEntity<>("Resource Created", HttpStatus.CREATED);

       }catch (IOException e){
           return  ResponseEntity.badRequest().body(e.getMessage());
       }

    }

    @PutMapping("/update")
    public ResponseEntity<String> updateResource(@RequestPart("resource") ResourceDto resourceDto,@RequestPart("file") MultipartFile file) {
        try {
            System.out.println(resourceDto.getResourceType()+ " " + resourceDto.getId()+ " " +resourceDto.getUserId());
        return ResponseEntity.accepted().body(resourceService.updateResource(resourceDto,file));

        }catch (AuthorizationDeniedException e ){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        }catch (RuntimeException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }catch (IOException e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
    @GetMapping("/")
    public ResponseEntity<List<ResourceDto>> getAllResources() {
      List<ResourceDto> resources =   resourceService.getResources();
      return ResponseEntity.ok(resources);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteResource(@PathVariable("id") long id) {
        try {
        return ResponseEntity.ok(resourceService.deleteResource(id));

        }catch (AuthorizationDeniedException e ){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        }catch (RuntimeException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }catch (IOException e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getResourceById(@PathVariable("id") long id) {
        try {
        return new ResponseEntity<>(resourceService.getResourcesById(id),HttpStatus.FOUND);

        }catch (RuntimeException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }


}
