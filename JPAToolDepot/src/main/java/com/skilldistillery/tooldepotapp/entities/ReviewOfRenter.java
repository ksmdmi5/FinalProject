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
@Table(name="review_of_renter")
public class ReviewOfRenter {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name="tool_review")
	private String toolReview;
	
	@Column(name="tool_rating")
	private double toolRating;
	
	@Column(name="lender_review")
	private String lenderReview;
	
	@Column(name="lender_rating")
	private double lenderRating;
	
	@OneToOne
	@JsonIgnore
	@JoinColumn(name="tool_rental_id")
	private ToolRental toolRental;
	
	public ReviewOfRenter() {}

	public ReviewOfRenter(int id, String toolReview, double toolRating, String lenderReview, double lenderRating) {
		super();
		this.id = id;
		this.toolReview = toolReview;
		this.toolRating = toolRating;
		this.lenderReview = lenderReview;
		this.lenderRating = lenderRating;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getToolReview() {
		return toolReview;
	}

	public void setToolReview(String toolReview) {
		this.toolReview = toolReview;
	}

	public double getToolRating() {
		return toolRating;
	}

	public void setToolRating(double toolRating) {
		this.toolRating = toolRating;
	}

	public String getLenderReview() {
		return lenderReview;
	}

	public void setLenderReview(String lenderReview) {
		this.lenderReview = lenderReview;
	}

	public double getLenderRating() {
		return lenderRating;
	}

	public void setLenderRating(double lenderRating) {
		this.lenderRating = lenderRating;
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
		builder.append("ReviewOfRenter [id=").append(id).append(", toolReview=").append(toolReview)
				.append(", renterRating=").append(toolRating).append(", lenderReview=").append(lenderReview)
				.append(", lenderRating=").append(lenderRating);
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
		ReviewOfRenter other = (ReviewOfRenter) obj;
		if (id != other.id)
			return false;
		return true;
	}
	
	

}
