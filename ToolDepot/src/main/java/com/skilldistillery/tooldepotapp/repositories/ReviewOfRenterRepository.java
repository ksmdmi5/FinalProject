package com.skilldistillery.tooldepotapp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.tooldepotapp.entities.ReviewOfRenter;

public interface ReviewOfRenterRepository  extends JpaRepository<ReviewOfRenter, Integer>{

	ReviewOfRenter findByToolRentalId(Integer TRid);
	
	ReviewOfRenter findByToolRentalIdAndId(Integer TRid, Integer RORid);
}
