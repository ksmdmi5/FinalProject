package com.skilldistillery.tooldepotapp.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.tooldepotapp.entities.ToolPhoto;

public interface ToolPhotoRepository extends JpaRepository<ToolPhoto, Integer> {

	List<ToolPhoto> findByToolId(int tid);
	
	ToolPhoto findByToolIdAndId(Integer Tid, Integer TPid);
}
