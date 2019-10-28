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

class ReviewOfWorkerTests {
	private static EntityManagerFactory emf; 
	private static EntityManager em;
	private static ReviewOfWorker reviewOfWorker;
	
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
		reviewOfWorker = em.find(ReviewOfWorker.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em = null;
		reviewOfWorker = null;
	}

	@Test
	void test1() {
		assertEquals(true, reviewOfWorker.getRecommend());
	}
}