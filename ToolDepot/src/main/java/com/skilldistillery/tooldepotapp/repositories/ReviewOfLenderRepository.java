package com.skilldistillery.tooldepotapp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.tooldepotapp.entities.ReviewOfLender;

public interface ReviewOfLenderRepository  extends JpaRepository<ReviewOfLender, Integer>{

	ReviewOfLender findByToolRentalId(Integer TRid);
	
	ReviewOfLender findByToolRentalIdAndId(Integer TRid, Integer ROLid);
}
