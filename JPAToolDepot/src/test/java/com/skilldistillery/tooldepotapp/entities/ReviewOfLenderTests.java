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

class ReviewOfLenderTests {
	private static EntityManagerFactory emf; 
	private static EntityManager em;
	private static ReviewOfLender lenderReview;
	
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
		lenderReview = em.find(ReviewOfLender.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em = null;
		lenderReview = null;
	}

	@Test
	@DisplayName("Test ReviewOfLender Entity")
	void test1() {
		assertEquals(5, lenderReview.getRenterRating());
	}
	
	@Test
	@DisplayName("Test ToolRental Mapping")
	void test2() {
		assertEquals(50, lenderReview.getToolRental().getTotalCost());
	}
	
	
}
