package com.techlab.speedrun.controller;

import com.techlab.speedrun.entity.Admin;
import com.techlab.speedrun.service.AdminService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admins")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping
    public List<Admin> getAllAdmins(
            @RequestParam(required = false, defaultValue = "") String name,
            @RequestParam(required = false, defaultValue = "") String password
    ) {
        return adminService.findAllAdmins(name, password);
    }
}
