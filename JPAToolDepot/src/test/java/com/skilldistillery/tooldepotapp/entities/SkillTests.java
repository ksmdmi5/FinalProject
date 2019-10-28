package com.skilldistillery.tooldepotapp.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class SkillTests {
	private static EntityManagerFactory emf; 
	private static EntityManager em;
	private static Skill skill;
	
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
		skill = em.find(Skill.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em = null;
		skill = null;
	}

	@Test
	void test1() {
		assertEquals("Painter", skill.getName());
		assertNotNull(skill.getUsers().size());
	}
}