package com.techlab.speedrun.service;

import com.techlab.speedrun.entity.Admin;
import com.techlab.speedrun.repository.AdminRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    private final AdminRepository adminRepository;

    public AdminService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    public List<Admin> findAllAdmins(String name, String password) {

        if (!name.isEmpty() && !password.isEmpty()) {
            return adminRepository.findByNameContainingAndPasswordContaining(name, password);
        }

        return adminRepository.findAll();
    }
}
