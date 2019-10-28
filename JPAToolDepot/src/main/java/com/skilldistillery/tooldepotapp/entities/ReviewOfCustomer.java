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

// THIS IS ON THE SKILL SIDE
@Entity
@Table(name="review_of_customer")
public class ReviewOfCustomer {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name="customer_review")
	private String customerReview;
	
	@Column(name="customer_rating")
	private Integer customerRating;
	
	private String title;
	
	@JsonIgnore
	@OneToOne
	@JoinColumn(name="skill_rental_id")
	private SkillRental skillRental;
	
	public ReviewOfCustomer() {
		super();
	}

	public ReviewOfCustomer(String customerReview, Integer customerRating, String title, SkillRental skillRental) {
		super();
		this.customerReview = customerReview;
		this.customerRating = customerRating;
		this.title = title;
		this.skillRental = skillRental;
	}

	public ReviewOfCustomer(String customerReview, Integer customerRating, String title) {
		super();
		this.customerReview = customerReview;
		this.customerRating = customerRating;
		this.title = title;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getCustomerReview() {
		return customerReview;
	}

	public void setCustomerReview(String customerReview) {
		this.customerReview = customerReview;
	}

	public Integer getCustomerRating() {
		return customerRating;
	}

	public void setCustomerRating(Integer customerRating) {
		this.customerRating = customerRating;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public SkillRental getSkillRental() {
		return skillRental;
	}

	public void setSkillRental(SkillRental skillRental) {
		this.skillRental = skillRental;
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
		ReviewOfCustomer other = (ReviewOfCustomer) obj;
		if (id != other.id)
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "ReviewOfCustomer [id=" + id + ", customerReview=" + customerReview + ", customerRating="
				+ customerRating + ", title=" + title + "]";
	}
	
}
