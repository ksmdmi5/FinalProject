package com.skilldistillery.tooldepotapp.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.tooldepotapp.entities.Tool;
import com.skilldistillery.tooldepotapp.entities.ToolPhoto;
import com.skilldistillery.tooldepotapp.repositories.ToolPhotoRepository;

@Service
public class ToolPhotoServiceImpl implements ToolPhotoService {

	@Autowired
	private ToolPhotoRepository photoRepo;
	@Autowired
	private ToolService toolSvc;
	
	
	@Override
	public ToolPhoto findById(Integer Tid, Integer TPid) {
		return photoRepo.findByToolIdAndId(Tid, TPid);
	}
	@Override
	public List<ToolPhoto> findAllPhotos(Integer Tid) {
		return photoRepo.findByToolId(Tid);
	}
	@Override
	public ToolPhoto update(Integer Tid, Integer TPid, ToolPhoto toolPhoto) {
		ToolPhoto editToolPhoto = findById(Tid, TPid);
		if (editToolPhoto != null) {
			toolPhoto.setTool(editToolPhoto.getTool());
			editToolPhoto.setPhotoUrl(toolPhoto.getPhotoUrl());
		}
		return photoRepo.saveAndFlush(editToolPhoto);
	}
	@Override
	public ToolPhoto create(ToolPhoto toolPhoto, Integer Tid) {
		toolPhoto.setTool(toolSvc.findById(Tid));
		toolSvc.findById(Tid).getPhotos().add(toolPhoto);
		return photoRepo.saveAndFlush(toolPhoto);
	}
	@Override
	public Boolean delete(Integer Tid, Integer TPid) {
		Boolean deleted = false;
		Tool tool = toolSvc.findById(Tid);
		if (photoRepo.existsById(TPid)) {
			ToolPhoto toolPhoto = photoRepo.findById(TPid).get();
			if (tool.getPhotos().contains(toolPhoto)) {
				toolPhoto.setTool(null);
				photoRepo.deleteById(TPid);
				deleted = true;
			}
		}
		return deleted;
	}
}
