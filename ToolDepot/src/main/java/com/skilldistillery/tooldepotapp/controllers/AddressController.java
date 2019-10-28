package com.skilldistillery.tooldepotapp.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.tooldepotapp.entities.Address;
import com.skilldistillery.tooldepotapp.entities.Tool;
import com.skilldistillery.tooldepotapp.entities.User;
import com.skilldistillery.tooldepotapp.repositories.ToolRepository;

@RestController
@CrossOrigin({ "*", "http://localhost:4242" })
@RequestMapping("api")
public class AddressController {
	
	@Autowired
	private ToolRepository toolRepo;
	
	@GetMapping("tool/{toolId}/address")
	public Address getAddressOfToolOwner(@PathVariable int toolId) {
		User user = new User();
		List<Tool> tools = toolRepo.findAll();
		for (Tool tool : tools) {
			if (tool.getId() == toolId) {
				user = tool.getUser();
			}
		}
		return user.getAddress();
	}
}
