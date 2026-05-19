package com.fitness.system.service.impl;

import org.springframework.stereotype.Service;
import com.fitness.system.service.HomeService;

@Service
public class HomeServiceImpl implements HomeService {

    @Override
    public String getHomeContent() {
        return "Welcome to Fitness System. Improve your health with exercises and diet plans.";
    }
}
