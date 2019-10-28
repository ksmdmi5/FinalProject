package com.skilldistillery.tooldepotapp.entities;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String username;
	
	private String password;
	
	private Boolean enabled = true;
	
	private String role;
	
	@Column(name="first_name")
	private String firstName;

	@Column(name="last_name")
	private String lastName;
	
	private String email;
	
	private String phone;
	
	private String photo = "https://i.imgur.com/345CKMe.png";
	
	@CreationTimestamp
	@Column(name="create_date")
	private LocalDateTime createDate;
	
	@UpdateTimestamp
	@Column(name="update_date")
	private LocalDateTime updateDate;
	
	@OneToOne
	@JoinColumn(name="address_id")
	private Address address;
	
	@OneToMany(mappedBy="user")
	@JsonIgnore
	private List<Tool> tools;
	
	@OneToMany(mappedBy="renter")
	@JsonIgnore
	private List<ToolRental> toolRentals;
	
	@OneToMany(mappedBy="renter")
	@JsonIgnore
	private List<SkillRental> skillRentals;
	
	@ManyToMany(mappedBy="users")
	@JsonIgnore
    private List<Skill> skills;
	
	@JsonIgnore
	@OneToMany(mappedBy="user")
	private List<UserSkill> userSkills;

	public User() {
	}

	public User(String username, String password, Boolean enabled) {
		this.username = username;
		this.password = password;
		this.enabled = enabled;
	}

	public User(String username, String password, Boolean enabled, String role, String firstName, String lastName,
			String email, String phone, String photo, Address address) {
		this.username = username;
		this.password = password;
		this.enabled = enabled;
		this.role = role;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.phone = phone;
		this.photo = photo;
		this.address = address;
	}
	
	public void addUserSkill(UserSkill userSkill) {
        if(userSkills == null) userSkills = new ArrayList<>();
        
        if(!userSkills.contains(userSkill)) {
        	userSkills.add(userSkill);
            if(userSkill.getUser() != null) {
            	userSkill.getUser().getUserSkills().remove(userSkill);
            }
            userSkill.setUser(this);
        }
    }
    
    public void removeUserSkill(UserSkill userSkill) {
    	userSkill.setUser(null);
        if(userSkills != null) {
        	userSkills.remove(userSkill);
        }
    }
	
	public void addTool(Tool tool) {
        if(tools == null) tools = new ArrayList<>();
        
        if(!tools.contains(tool)) {
            tools.add(tool);
            if(tool.getUser() != null) {
                tool.getUser().getTools().remove(tool);
            }
            tool.setUser(this);
        }
    }
    
	public void removeTool(Tool tool) {
		tool.setUser(null);
		if(tools != null) {
			tools.remove(tool);
		}
	}

	public void removeToolRental(ToolRental toolRental) {
        toolRental.setRenter(null);
        if(toolRentals != null) {
            toolRentals.remove(toolRental);
        }
    }
    
    public void addToolRental(ToolRental toolRental) {
    	if(toolRentals == null) toolRentals = new ArrayList<>();
    	
    	if(!toolRentals.contains(toolRental)) {
    		toolRentals.add(toolRental);
    		if(toolRental.getRenter() != null) {
    			toolRental.getRenter().getToolRentals().remove(toolRental);
    		}
    		toolRental.setRenter(this);
    	}
    }
    
    public void removeSkillRental(SkillRental skillRental) {
    	skillRental.setRenter(null);
    	if(skillRentals != null) {
    		skillRentals.remove(skillRental);
    	}
    }
    
    public void addSkillRental(SkillRental skillRental) {
    	if(skillRentals == null) skillRentals = new ArrayList<>();
    	
    	if(!skillRentals.contains(skillRental)) {
    		skillRentals.add(skillRental);
    		if(skillRental.getRenter() != null) {
    			skillRental.getRenter().getSkillRentals().remove(skillRental);
    		}
    		skillRental.setRenter(this);
    	}
    }
    
    
    public void addSkill(Skill skill) {
        if (skills == null) {
        	skills = new ArrayList<>();
        }
        if(!skills.contains(skill)) {
        	skills.add(skill);
        	skill.addUser(this);
        }
    }
    
    public void removeSkill(Skill skill) {
        if (skills != null && skills.contains(skill)) {
        	skills.remove(skill);
        	skill.removeUser(this);
        }
    }
    
	public List<UserSkill> getUserSkills() {
		return new ArrayList<>(userSkills);
	}

	public void setUserSkills(List<UserSkill> userSkills) {
		this.userSkills = userSkills;
	}

	public List<Skill> getSkills() {
		return new ArrayList<>(skills);
	}

	public void setSkills(List<Skill> skills) {
		this.skills = skills;
	}

	public List<SkillRental> getSkillRentals() {
		return new ArrayList<>(skillRentals);
	}

	public void setSkillRentals(List<SkillRental> skillRentals) {
		this.skillRentals = skillRentals;
	}

	public List<ToolRental> getToolRentals() {
		return new ArrayList<>(toolRentals);
	}

	public void setToolRentals(List<ToolRental> toolRentals) {
		this.toolRentals = toolRentals;
	}

	public List<Tool> getTools() {
		return new ArrayList<>(tools);
	}

	public void setTools(List<Tool> tools) {
		this.tools = tools;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Boolean getEnabled() {
		return enabled;
	}

	public void setEnabled(Boolean enabled) {
		this.enabled = enabled;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getPhoto() {
		return photo;
	}

	public void setPhoto(String photo) {
		this.photo = photo;
	}

	public LocalDateTime getCreateDate() {
		return createDate;
	}

	public void setCreateDate(LocalDateTime createDate) {
		this.createDate = createDate;
	}

	public LocalDateTime getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(LocalDateTime updateDate) {
		this.updateDate = updateDate;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
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
		User other = (User) obj;
		if (id != other.id)
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", username=" + username + ", password=" + password + ", enabled=" + enabled
				+ ", role=" + role + ", firstName=" + firstName + ", lastName=" + lastName + ", email=" + email
				+ ", phone=" + phone + ", photo=" + photo + ", createDate=" + createDate + ", updateDate=" + updateDate
				+ ", address=" + address + "]";
	}
	
}
