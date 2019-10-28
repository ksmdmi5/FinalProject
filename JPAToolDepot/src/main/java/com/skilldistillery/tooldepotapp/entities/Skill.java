package com.skilldistillery.tooldepotapp.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Skill {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String name;
	
	@Column(name="cost_per_hour")
	private Double costPerHour;
	
	private Boolean available;
	
	private String description;
	
	private String expertise;
	
	@JsonIgnore
	@ManyToMany(cascade= CascadeType.ALL)
	@JoinTable(name="user_skill", joinColumns=@JoinColumn(name="skill_id"),
	inverseJoinColumns=@JoinColumn(name="user_id"))
	private List<User> users;
	
	@JsonIgnore
	@OneToMany(mappedBy="skill")
	private List<UserSkill> userSkills;
	
	public Skill() {
		super();
	}

	public Skill(String name, Double costPerHour, Boolean available, String description, String expertise) {
		super();
		this.name = name;
		this.costPerHour = costPerHour;
		this.available = available;
		this.description = description;
		this.expertise = expertise;
	}

	public Skill(String name, Double costPerHour, Boolean available, String description, String expertise, List<User> users) {
		super();
		this.name = name;
		this.costPerHour = costPerHour;
		this.available = available;
		this.description = description;
		this.expertise = expertise;
		this.users = users;
	}
	
	public void addUser(User user) {
        if (users == null) {
        	users = new ArrayList<>();
        }
        if(!users.contains(user)) {
        	users.add(user);
        	user.addSkill(this);
        }
    }
    
    public void removeUser(User user) {
        if (users != null && users.contains(user)) {
        	users.remove(user);
        	user.removeSkill(this);
        }
    }
    
    public void addUserSkill(UserSkill userSkill) {
        if(userSkills == null) userSkills = new ArrayList<>();
        
        if(!userSkills.contains(userSkill)) {
        	userSkills.add(userSkill);
            if(userSkill.getSkill() != null) {
            	userSkill.getSkill().getUserSkills().remove(userSkill);
            }
            userSkill.setSkill(this);
        }
    }
    
    public void removeClient(UserSkill userSkill) {
    	userSkill.setSkill(null);
        if(userSkills != null) {
        	userSkills.remove(userSkill);
        }
    }
    
	public List<UserSkill> getUserSkills() {
		return new ArrayList<>(userSkills);
	}

	public void setUserSkills(List<UserSkill> userSkills) {
		this.userSkills = userSkills;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Double getCostPerHour() {
		return costPerHour;
	}

	public void setCostPerHour(Double costPerHour) {
		this.costPerHour = costPerHour;
	}

	public Boolean getAvailable() {
		return available;
	}

	public void setAvailable(Boolean available) {
		this.available = available;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getExpertise() {
		return expertise;
	}

	public void setExpertise(String expertise) {
		this.expertise = expertise;
	}

	public List<User> getUsers() {
		return new ArrayList<>(users);
	}

	public void setUsers(List<User> users) {
		this.users = users;
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
		Skill other = (Skill) obj;
		if (id != other.id)
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Skill [id=" + id + ", name=" + name + ", costPerHour=" + costPerHour + ", available=" + available + ", description="
				+ description + ", expertise=" + expertise + "]";
	}
	
}
