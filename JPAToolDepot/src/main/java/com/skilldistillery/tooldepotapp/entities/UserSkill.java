package com.skilldistillery.tooldepotapp.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="user_skill")
public class UserSkill {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private Boolean certified;
	
	private Integer experience;
	
	@ManyToOne
	@JoinColumn(name="skill_id")
	private Skill skill;
	
	@ManyToOne
	@JoinColumn(name="user_id")
	private User user;

	public UserSkill() {
		super();
	}

	public UserSkill(Boolean certified, Integer experience) {
		super();
		this.certified = certified;
		this.experience = experience;
	}

	public UserSkill(Boolean certified, Integer experience, Skill skill, User user) {
		super();
		this.certified = certified;
		this.experience = experience;
		this.skill = skill;
		this.user = user;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Boolean getCertified() {
		return certified;
	}

	public void setCertified(Boolean certified) {
		this.certified = certified;
	}

	public Integer getExperience() {
		return experience;
	}

	public void setExperience(Integer experience) {
		this.experience = experience;
	}

	public Skill getSkill() {
		return skill;
	}

	public void setSkill(Skill skill) {
		this.skill = skill;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + id;
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		UserSkill other = (UserSkill) obj;
		if (id != other.id)
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "UserSkill [id=" + id + ", certified=" + certified + ", experience=" + experience + ", skill=" + skill
				+ ", user=" + user + "]";
	}
	
	
	
}
