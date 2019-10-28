package com.skilldistillery.tooldepotapp.services;

import java.util.List;

import com.skilldistillery.tooldepotapp.entities.User;

public interface UserService {

	User findById(int id, String username);
	
	User findByUsername(String username);
	
	List<User> findAllUsers(String name);

	User update(String username, int id, User user);

	User create(User user);

	Boolean delete(int id);

}
