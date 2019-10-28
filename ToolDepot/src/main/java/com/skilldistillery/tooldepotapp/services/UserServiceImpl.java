package com.skilldistillery.tooldepotapp.services;

import java.util.List;


import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.tooldepotapp.entities.User;
import com.skilldistillery.tooldepotapp.repositories.UserRepository;


@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository repo;

	@Override
	public User findById(int id, String username) {
		Optional<User> userId = repo.findById(id);
		User user = null;
		if (userId.isPresent()) {
			user = userId.get();
		}
		return user;
	}

	@Override
	public List<User> findAllUsers(String name) {
		List<User> allUsers = repo.findAll();
		User admin = null;
		for (User user : allUsers) {
			if (name.equals(user.getUsername())) {
				admin = user;
			}
		}
		if (admin.getRole().equals("admin")) {
			return allUsers;
		}
		return null;
	}

	@Override
	public User update(String username,int id, User user) {
		User editUser = findById(id, username);

		if (editUser != null) {
			editUser.setUsername(user.getUsername());
			editUser.setPassword(user.getPassword());
			editUser.setEnabled(user.getEnabled());
			editUser.setRole(user.getRole());
			editUser.setFirstName(user.getFirstName());
			editUser.setLastName(user.getLastName());
			editUser.setEmail(user.getEmail());
			editUser.setPhone(user.getPhone());
			editUser.setPhoto(user.getPhoto());
			editUser.setCreateDate(user.getCreateDate());
			editUser.setUpdateDate(user.getUpdateDate());
		}
		return repo.saveAndFlush(editUser);
	}

	@Override
	public User create(User user) {
		return repo.saveAndFlush(user);
	}

	@Override
	public Boolean delete(int id) {
		Boolean deleted = false;
		if (repo.existsById(id)) {
			repo.deleteById(id);
			deleted = true;
		}
		return deleted;
	}

	@Override
	public User findByUsername(String username) {
		return repo.findByUsername(username);
	}

}
