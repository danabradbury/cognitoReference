package com.bradbury.dana.cognito.demo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GenericController {
    private static final Logger logger = LoggerFactory.getLogger(GenericController.class);

    @GetMapping("/api/public/hello")
    public ApiResponse publicEndpoint() {
        logger.info("public endpoint hit successfully");
        return new ApiResponse("Hello, This is a public endpoint");
    }

    @GetMapping("/api/hello")
    public ApiResponse hello() {
        logger.info("hello endpoint hit successfully");
        return new ApiResponse("Hello, World!");
    }
}