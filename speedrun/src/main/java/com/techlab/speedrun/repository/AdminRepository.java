package com.techlab.speedrun.repository;

import com.techlab.speedrun.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {
    List<Admin> findByNameContainingAndPasswordContaining(String name, String password);
}
