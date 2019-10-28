package com.skilldistillery.tooldepotapp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.tooldepotapp.entities.User;


public interface UserRepository extends JpaRepository<User, Integer> {

	User findByUsername(String username);
}
