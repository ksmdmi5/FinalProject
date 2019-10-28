package com.skilldistillery.tooldepotapp.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.tooldepotapp.entities.Tool;
import com.skilldistillery.tooldepotapp.entities.ToolPhoto;
import com.skilldistillery.tooldepotapp.entities.ToolRental;
import com.skilldistillery.tooldepotapp.repositories.ToolPhotoRepository;
import com.skilldistillery.tooldepotapp.repositories.ToolRentalRepository;
import com.skilldistillery.tooldepotapp.repositories.ToolRepository;
import com.skilldistillery.tooldepotapp.repositories.UserRepository;

@Service
public class ToolServiceImpl implements ToolService {
	
	@Autowired
	private ToolRepository toolRepo;
	@Autowired 
	private UserRepository userRepo;
	@Autowired
	private ToolRentalRepository trRepo;
	@Autowired
	private ToolPhotoRepository tpRepo;

	
	@Override
	public Tool findById(int id) {
		Optional<Tool> toolId = toolRepo.findById(id);
		Tool tool = null;
		if (toolId.isPresent()) {
			tool = toolId.get();
		}
		return tool;
	}

	@Override
	public List<Tool> findAllTools() {
		return toolRepo.findAll();
	}

	@Override
	public Tool update(int id, Tool tool) {
		Tool editTool = findById(id);
		userRepo.saveAndFlush(tool.getUser());
		if (editTool != null) {
			editTool.setName(tool.getName());
			editTool.setDescription(tool.getDescription());
			editTool.setType(tool.getType());
			editTool.setCostPerDay(tool.getCostPerDay());
			editTool.setAvailable(tool.isAvailable());
			editTool.setManufactureYear(tool.getManufactureYear());
			editTool.setCondition(tool.getCondition());
		}
		return toolRepo.saveAndFlush(editTool);
	}

	@Override
	public Tool create(Tool tool, String username) {
		tool.setUser(userRepo.findByUsername(username));
		tool.setAvailable(true);
		System.out.println(tool.getPhotos().get(0));
		tool.getPhotos().get(0).setTool(tool);
		tpRepo.saveAndFlush(tool.getPhotos().get(0));
		return toolRepo.saveAndFlush(tool);
	}

	@Override
	public Boolean delete(int id) {
		Boolean deleted = false;
		
		if (toolRepo.existsById(id)) {
			Tool tool = toolRepo.findById(id).get();
			for (ToolPhoto photo : toolRepo.findById(id).get().getPhotos()) {
				tool.removePhoto(photo);
			}
			List<ToolRental> listOfTr = trRepo.findByToolId(id);
			for (ToolRental tr : listOfTr) {
				tool.removeRental(tr);
			}
			toolRepo.findById(id).get().setUser(null);
			toolRepo.deleteById(id);
			deleted = true;
		}
		return deleted;
	}

	@Override
	public List<Tool> findToolsBySearchTerm(String searchTerm) {
		return toolRepo.findToolsContainingSearchTerm(searchTerm);
	}

	@Override
	public List<Tool> findByUserUsername(String username) {
		return toolRepo.findByUserUsername(username);
	}

}
