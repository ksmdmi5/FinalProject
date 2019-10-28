package com.skilldistillery.tooldepotapp.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class ToolPhotoTests {
	private static EntityManagerFactory emf; 
	private static EntityManager em;
	private static ToolPhoto toolPhoto;
	
	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("ToolDepotPU");
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf = null;
	}

	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
		toolPhoto = em.find(ToolPhoto.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em = null;
		toolPhoto = null;
	}

	@Test
	@DisplayName("Test ToolPhoto Entity")
	void test1() {
		assertEquals("http://bit.ly/31l9OIv", toolPhoto.getPhotoUrl());
	}
	@Test
	@DisplayName("Test Tool Mapping")
	void test2() {
		assertEquals("Table Saw", toolPhoto.getTool().getName());
	}
}
