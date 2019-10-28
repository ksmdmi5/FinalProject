package com.skilldistillery.tooldepotapp.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.skilldistillery.tooldepotapp.entities.Address;
import com.skilldistillery.tooldepotapp.entities.User;
import com.skilldistillery.tooldepotapp.repositories.AddressRepository;
import com.skilldistillery.tooldepotapp.repositories.UserRepository;

@Service
public class AuthServiceImpl implements AuthService {

	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private AddressRepository addressRepo;
	
	@Autowired
	private PasswordEncoder encoder;
	
	@Override
	public User register(User user) {
		Address address = new Address();
		addressRepo.saveAndFlush(address); 
		String encodedPw = encoder.encode(user.getPassword());
		user.setAddress(address);
		user.setPassword(encodedPw);
		user.setEnabled(true);
		user.setRole("user");
		userRepo.saveAndFlush(user);
		return user;
	}

}
