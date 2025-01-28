package com.peeraid.backend.services;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.peeraid.backend.models.enums.Image;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

@Service
public class CloudinaryService {

    Cloudinary cloudinary;

    @Autowired
    public CloudinaryService(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    @Async
    public CompletableFuture<Image> uploadImage(MultipartFile file) throws IOException {
        Map uploadResult = cloudinary.uploader().upload(file.getBytes(),
                ObjectUtils.asMap("resource_type", "auto"));
        Image image = new Image(
                uploadResult.get("public_id").toString(),
                uploadResult.get("url").toString()
        );
        return CompletableFuture.completedFuture(image);
    }


    @Async
    public void deleteImage(String publicId) throws IOException {
        cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
    }

    @Async
    public CompletableFuture<String> updateImage(MultipartFile file, String publicId) {
        try {
            Map uploadResult = cloudinary.uploader().upload(file.getBytes(),
                    ObjectUtils.asMap(
                            "public_id", publicId, // Reuse the same public_id
                            "overwrite", true,     // Overwrite the existing image
                            "resource_type", "auto"
                    ));
            return CompletableFuture.completedFuture(uploadResult.get("url").toString());
        } catch (IOException e) {
            throw new RuntimeException("Error updating image: " + e.getMessage(), e);
        }
    }


}
