package com.isep.spring.repository;

import java.util.Optional;

import com.isep.spring.models.ERole;
import com.isep.spring.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
  Optional<Role> findByName(ERole name);
}
