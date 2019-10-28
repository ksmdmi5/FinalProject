package com.skilldistillery.tooldepotapp.repositories;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.skilldistillery.tooldepotapp.entities.ToolRental;

public interface ToolRentalRepository extends JpaRepository<ToolRental, Integer> {

	List<ToolRental> findByRenter_Id(int rid);
	@Query("select tr from ToolRental tr where tr.renter.id = :id or tr.tool.user.id = :id")
	List<ToolRental> findByRenterIdOrUserId(@Param(value = "id") int id);
	List<ToolRental> findByToolId(int id);
	
}
