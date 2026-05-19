package com.fitness.system.service;

import com.fitness.system.model.User;

public interface AuthService {
    User register(User user);
    User login(String email, String password);
}
