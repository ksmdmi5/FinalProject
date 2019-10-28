package com.skilldistillery.tooldepotapp.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.tooldepotapp.entities.ToolRental;
import com.skilldistillery.tooldepotapp.entities.User;
import com.skilldistillery.tooldepotapp.repositories.ToolRentalRepository;
import com.skilldistillery.tooldepotapp.repositories.ToolRepository;
import com.skilldistillery.tooldepotapp.repositories.UserRepository;

@Service
public class ToolRentalServiceImpl implements ToolRentalService {

	@Autowired
	private ToolRentalRepository trRepo;
	@Autowired
	private UserRepository userRepo;
	@Autowired
	private ToolRepository toolRepo;
	
	@Override
	public List<ToolRental> getAllToolRentals() {
		return trRepo.findAll();
	}
	
	@Override
	public ToolRental findById(int id) {
		Optional<ToolRental> toolRentalOpt = trRepo.findById(id);
		ToolRental toolRental = null;
		if (toolRentalOpt.isPresent()) {
			toolRental = toolRentalOpt.get();
		}
		return toolRental;
	}
	
	@Override
	public List<ToolRental> getToolRentalsByUsername(String username) {
		User user = userRepo.findByUsername(username);
		List<ToolRental> listOfAllTr = trRepo.findByRenterIdOrUserId(user.getId());
		List<ToolRental> listOfOwnedToolsAndRentals = new ArrayList<>();
		for (ToolRental tr: listOfAllTr) {
			if (tr.getTool().getUser().getUsername().equals(username)) {
				listOfOwnedToolsAndRentals.add(tr);
			}
		}
		listOfOwnedToolsAndRentals.add(new ToolRental());
		for (ToolRental tr: listOfAllTr) {
			if (tr.getRenter().getUsername().equals(username)) {
				listOfOwnedToolsAndRentals.add(tr);
			}
		}
		return listOfOwnedToolsAndRentals;
		
	}

	@Override
	public List<ToolRental> getToolRentalsByTool(int toolId) {
		return trRepo.findByToolId(toolId);
	}
	
	@Override
	public ToolRental create(String username, int toolId, ToolRental toolRental) {
		try {
			toolRental.setRenter(userRepo.findByUsername(username));
			toolRental.setTool(toolRepo.findById(toolId).get());
			toolRental.getTool().setAvailable(false);
			trRepo.saveAndFlush(toolRental);
		} catch (Exception e) {
			toolRental = null;
			e.printStackTrace();
		}
		return toolRental;
	}

	@Override
	public ToolRental update(int id, ToolRental toolRental) {
		ToolRental editToolRental = trRepo.findById(id).get();

		if (editToolRental != null) {
			editToolRental.setTool(toolRental.getTool());
			editToolRental.setCheckout(toolRental.getCheckout());
			editToolRental.setReturned(toolRental.getReturned());
			if (editToolRental.getReturned() != null) {
				editToolRental.getTool().setAvailable(true);
			}
			editToolRental.setTotalCost(toolRental.getTotalCost());
			return trRepo.saveAndFlush(editToolRental);
		} else {
			return null;
		}
	}


	@Override
	public Boolean delete(int id) {
		Boolean deleted = false;
		if (trRepo.existsById(id)) {
			ToolRental tr = trRepo.findById(id).get();
			tr.setRenter(null);
			
			if(tr.getLenderReview() != null) {
			tr.getLenderReview().setToolRental(null);
			}
			if(tr.getRenterReview() != null) {
				tr.getRenterReview().setToolRental(null);;
			}
			tr.setTool(null);
			trRepo.deleteById(id);
			deleted = true;
		}
		return deleted;
	}



}
