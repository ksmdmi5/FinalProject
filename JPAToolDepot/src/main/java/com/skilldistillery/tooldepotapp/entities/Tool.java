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
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
public class Tool {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@ManyToOne(cascade = CascadeType.MERGE)
	@JoinColumn(name = "user_id")
	private User user;
	
	@Column(name="tool_name")
	private String name;
	
	private String description;
	
	@Column(name="tool_type")
	private String type;
	
	@Column(name="cost_per_day")
	private double costPerDay;
	
	private boolean available;
	
	@Column(name="manufacture_year")
	private String manufactureYear;
	
	@Column(name="tool_condition")
	private String condition;
	
	@JsonIgnoreProperties("tool")
	@OneToMany(mappedBy = "tool")
	private List<ToolRental> rentals;
	
	@JsonIgnore
	@OneToMany(mappedBy = "tool")
	private List<ToolPhoto> toolPhotos;
	
	
	public Tool() {}


	public Tool(int id, String name, String description, String type, double costPerDay, boolean available,
			String manufactureYear, String condition) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
		this.type = type;
		this.costPerDay = costPerDay;
		this.available = available;
		this.manufactureYear = manufactureYear;
		this.condition = condition;
	}
	
    public void addPhoto(ToolPhoto photo) {
        if(toolPhotos == null) toolPhotos = new ArrayList<>();
        
        if(!toolPhotos.contains(photo)) {
            toolPhotos.add(photo);
            if(photo.getTool() != null) {
                photo.getTool().getPhotos().remove(photo);
            }
            photo.setTool(this);
        }
    }
    
    public void removePhoto(ToolPhoto photo) {
        photo.setTool(null);
        if(toolPhotos != null) {
            toolPhotos.remove(photo);
        }
    }
    
    public void addRental(ToolRental rental) {
        if(rentals == null) rentals = new ArrayList<>();
        
        if(!rentals.contains(rental)) {
            rentals.add(rental);
            if(rental.getTool() != null) {
                rental.getTool().getRentals().remove(rental);
            }
            rental.setTool(this);
        }
    }
    
    public void removeRental(ToolRental rental) {
        rental.setTool(null);
        if(rentals != null) {
            rentals.remove(rental);
        }
    }


	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public User getUser() {
		return user;
	}


	public void setUser(User user) {
		this.user = user;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public String getDescription() {
		return description;
	}


	public void setDescription(String description) {
		this.description = description;
	}


	public String getType() {
		return type;
	}


	public void setType(String type) {
		this.type = type;
	}


	public double getCostPerDay() {
		return costPerDay;
	}


	public void setCostPerDay(double costPerDay) {
		this.costPerDay = costPerDay;
	}


	public boolean isAvailable() {
		return available;
	}


	public void setAvailable(boolean available) {
		this.available = available;
	}


	public String getManufactureYear() {
		return manufactureYear;
	}


	public void setManufactureYear(String manufactureYear) {
		this.manufactureYear = manufactureYear;
	}


	public String getCondition() {
		return condition;
	}


	public void setCondition(String condition) {
		this.condition = condition;
	}

	public void setRentals(List<ToolRental> rentals) {
		this.rentals = rentals;
	}

	public List<ToolRental> getRentals() {
		return new ArrayList<>(rentals);
	}
	
	public List<ToolPhoto> getPhotos() {
		return new ArrayList<>(toolPhotos);
	}

	public void setPhotos(List<ToolPhoto> photos) {
		this.toolPhotos = photos;
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
		Tool other = (Tool) obj;
		if (id != other.id)
			return false;
		return true;
	}


	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("Tool [id=").append(id).append(", user=").append(user).append(", name=").append(name)
				.append(", description=").append(description).append(", type=").append(type).append(", costPerDay=")
				.append(costPerDay).append(", available=").append(available).append(", manufactureYear=")
				.append(manufactureYear).append(", condition=").append(condition).append("]");
		return builder.toString();
	}
	
	
}
