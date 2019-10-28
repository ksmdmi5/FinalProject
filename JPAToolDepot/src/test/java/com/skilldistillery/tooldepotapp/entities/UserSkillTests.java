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

class UserSkillTests {
	private static EntityManagerFactory emf; 
	private static EntityManager em;
	private static UserSkill userSkill;
	
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
		userSkill = em.find(UserSkill.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em = null;
		userSkill = null;
	}

	@Test
	void test1() {
		assertEquals(5, userSkill.getExperience());
		assertEquals("Josh", userSkill.getUser().getFirstName());
	}
}