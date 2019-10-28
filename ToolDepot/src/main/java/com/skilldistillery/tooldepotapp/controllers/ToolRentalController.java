package com.skilldistillery.tooldepotapp.controllers;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.tooldepotapp.entities.Tool;
import com.skilldistillery.tooldepotapp.entities.ToolRental;
import com.skilldistillery.tooldepotapp.repositories.UserRepository;
import com.skilldistillery.tooldepotapp.services.ToolRentalService;

@RestController
@CrossOrigin({ "*", "http://localhost:4242" })
@RequestMapping("api")
public class ToolRentalController {

	@Autowired
	private ToolRentalService trService;
	@Autowired
	private UserRepository userRepo;

	@GetMapping("toolRental")
	public List<ToolRental> getAll(Principal principal, HttpServletResponse resp) {
		try {
			if (userRepo.findByUsername(principal.getName()).getRole().equals("admin")) {
				resp.setStatus(200);
				return trService.getAllToolRentals();
			}
		} catch (Exception e) {
			resp.setStatus(401);
			e.printStackTrace();
		}
		resp.setStatus(401);
		return new ArrayList<ToolRental>();
	}
	

	@GetMapping("toolRental/findId/{id}")
	public ToolRental getToolRentalsById(@PathVariable("id") Integer id,
			HttpServletResponse resp) { 
			ToolRental toolRental = trService.findById(id);
			return toolRental;
	}

	@GetMapping("toolRental/{username}")
	public List<ToolRental> getToolRentalsByUsername(Principal principal, @PathVariable String username,
			HttpServletResponse resp) {
		try {
			if (principal.getName().equals(username) || userRepo.findByUsername(username).getRole().equals("admin")) {
				resp.setStatus(200);
				return trService.getToolRentalsByUsername(username);
			}
		} catch (Exception e) {
			resp.setStatus(401);
			e.printStackTrace();
		}
		resp.setStatus(401);
		return new ArrayList<ToolRental>();

	}

	@GetMapping("tool/{id}/toolRental")
	public List<ToolRental> getToolRentalsByToolId(@PathVariable int id, HttpServletResponse resp) {
		if (trService.getToolRentalsByTool(id).size() == 0) {
			resp.setStatus(404);
			return new ArrayList<ToolRental>();
		}
		resp.setStatus(200);
		return (trService.getToolRentalsByTool(id));
	}
	
	@PostMapping("toolRental")
	public ToolRental createToolRental(Principal principal, @RequestParam int toolId, @RequestBody ToolRental toolRental, HttpServletResponse resp, HttpServletRequest req) {
		try {
			toolRental = trService.create(principal.getName(), toolId, toolRental);
			if (toolRental == null) {
				resp.setStatus(404);
			} else {
				resp.setStatus(201);
				StringBuffer url = req.getRequestURL();
				url.append(toolRental.getId());
				resp.setHeader("Location", url.toString());
				
			}
		} catch (Exception e) {
			resp.setStatus(401);
			e.printStackTrace();
		}
		return toolRental;
	}
	
	@PutMapping("toolRental/{toolRentalId}")
	public ToolRental updateToolRental(@PathVariable int toolRentalId, @RequestBody ToolRental toolRental, HttpServletResponse resp) {
		if (trService.update(toolRentalId, toolRental) != null) {
			resp.setStatus(200);
			return toolRental;
		}
		else {
			resp.setStatus(400);
			return null;
		}
	}
	
	@DeleteMapping("toolRental/{toolRentalId}")
	public boolean deleteToolRental(@PathVariable int toolRentalId, HttpServletResponse resp) {
		if (trService.delete(toolRentalId)) {
			return true;
		}
		return false;
	}
	
	
	
}
