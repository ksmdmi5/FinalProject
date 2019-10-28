package com.skilldistillery.tooldepotapp.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.skilldistillery.tooldepotapp.entities.Tool;

public interface ToolRepository extends JpaRepository<Tool, Integer>{
	@Query("select tool from Tool tool where tool.name LIKE %:searchterm% OR tool.description LIKE %:searchterm% OR tool.type LIKE %:searchterm%")
    List<Tool> findToolsContainingSearchTerm(@Param("searchterm") String searchterm);
	@Query("select t from Tool t where t.user = :id")
	List<Tool> findByUser(@Param(value = "id") int id);
	
	List<Tool> findByUserUsername(String username);
}
