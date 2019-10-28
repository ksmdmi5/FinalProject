package com.skilldistillery.tooldepotapp.entities;

import static org.junit.jupiter.api.Assertions.*;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ReviewOfCustomerTests {
	private static EntityManagerFactory emf; 
	private static EntityManager em;
	private static ReviewOfCustomer reviewOfCustomer;
	
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
		reviewOfCustomer = em.find(ReviewOfCustomer.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em = null;
		reviewOfCustomer = null;
	}

	@Test
	void test1() {
		assertEquals("Some Title", reviewOfCustomer.getTitle());
		assertEquals("Centennial", reviewOfCustomer.getSkillRental().getRenter().getAddress().getCity());
		assertEquals(8, reviewOfCustomer.getSkillRental().getRenter().getTools().size());
	}
}