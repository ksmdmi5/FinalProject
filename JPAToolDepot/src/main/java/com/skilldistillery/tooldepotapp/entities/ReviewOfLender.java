package com.skilldistillery.tooldepotapp.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
@Table(name="review_of_lender")
public class ReviewOfLender {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name="renter_review")
	private String renterReview;
	
	@Column(name="renter_rating")
	private double renterRating;
	
	@OneToOne
	@JsonIgnore
	@JoinColumn(name="tool_rental_id")
	private ToolRental toolRental;
	
	public ReviewOfLender() {}

	public ReviewOfLender(int id, String renterReview, double renterRating) {
		super();
		this.id = id;
		this.renterReview = renterReview;
		this.renterRating = renterRating;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getRenterReview() {
		return renterReview;
	}

	public void setRenterReview(String renterReview) {
		this.renterReview = renterReview;
	}

	public double getRenterRating() {
		return renterRating;
	}

	public void setRenterRating(double renterRating) {
		this.renterRating = renterRating;
	}

	public ToolRental getToolRental() {
		return toolRental;
	}

	public void setToolRental(ToolRental toolRental) {
		this.toolRental = toolRental;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("ReviewOfLender [id=").append(id).append(", renterReview=").append(renterReview)
				.append(", renterRating=").append(renterRating);
		return builder.toString();
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
		ReviewOfLender other = (ReviewOfLender) obj;
		if (id != other.id)
			return false;
		return true;
	}
	
	

}
