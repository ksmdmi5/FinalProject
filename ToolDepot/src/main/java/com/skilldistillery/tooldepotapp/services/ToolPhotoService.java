package com.skilldistillery.tooldepotapp.services;

import java.util.List;

import com.skilldistillery.tooldepotapp.entities.ToolPhoto;

public interface ToolPhotoService {

	ToolPhoto findById(Integer Tid, Integer TPid);
	
	List<ToolPhoto> findAllPhotos(Integer tid);

	ToolPhoto update(Integer Tid, Integer TPid, ToolPhoto toolPhoto);

	ToolPhoto create(ToolPhoto toolPhoto, Integer Tid);

	Boolean delete(Integer Tid, Integer TPid);
}
