package com.skilldistillery.tooldepotapp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.tooldepotapp.entities.Address;

public interface AddressRepository extends JpaRepository<Address, Integer> {

	
}
