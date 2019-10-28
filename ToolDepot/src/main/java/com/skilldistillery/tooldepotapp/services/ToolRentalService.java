package com.skilldistillery.tooldepotapp.services;

import java.util.List;

import com.skilldistillery.tooldepotapp.entities.ToolRental;

public interface ToolRentalService {

	List<ToolRental> getAllToolRentals();

	List<ToolRental> getToolRentalsByUsername(String username);
	
	List<ToolRental> getToolRentalsByTool(int toolId);

	ToolRental create(String username, int toolId, ToolRental toolRental);

	ToolRental update(int id, ToolRental toolRental);
	
	Boolean delete(int id);

	ToolRental findById(int id);
}
