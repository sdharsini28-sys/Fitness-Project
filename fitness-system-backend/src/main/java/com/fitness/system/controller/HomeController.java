package com.fitness.system.controller;

import org.springframework.web.bind.annotation.*;
import com.fitness.system.service.HomeService;

@RestController
@RequestMapping("/home")
@CrossOrigin
public class HomeController {

    private final HomeService homeService;

    public HomeController(HomeService homeService) {
        this.homeService = homeService;
    }

    @GetMapping
    public String getHome() {
        return homeService.getHomeContent();
    }
}
