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

//THIS IS ON THE SKILL SIDE
@Entity
@Table(name="review_of_worker")
public class ReviewOfWorker {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name="worker_review")
	private String workerReview;

	@Column(name="worker_rating")
	private Integer workerRating;
	
	private String title;
	
	private Boolean Recommend;
	
	@Column(name="finished_on_time")
	private Boolean finishedOnTime;
	
	@JsonIgnore
	@OneToOne
	@JoinColumn(name="skill_rental_id")
	private SkillRental skillRental;
	
	public ReviewOfWorker() {
		super();
	}

	public ReviewOfWorker(String workerReview, Integer workerRating, String title, Boolean recommend,
			Boolean finishedOnTime, SkillRental skillRental) {
		super();
		this.workerReview = workerReview;
		this.workerRating = workerRating;
		this.title = title;
		Recommend = recommend;
		this.finishedOnTime = finishedOnTime;
		this.skillRental = skillRental;
	}

	public ReviewOfWorker(String workerReview, Integer workerRating, String title, Boolean recommend,
			Boolean finishedOnTime) {
		super();
		this.workerReview = workerReview;
		this.workerRating = workerRating;
		this.title = title;
		Recommend = recommend;
		this.finishedOnTime = finishedOnTime;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getWorkerReview() {
		return workerReview;
	}

	public void setWorkerReview(String workerReview) {
		this.workerReview = workerReview;
	}

	public Integer getWorkerRating() {
		return workerRating;
	}

	public void setWorkerRating(Integer workerRating) {
		this.workerRating = workerRating;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Boolean getRecommend() {
		return Recommend;
	}

	public void setRecommend(Boolean recommend) {
		Recommend = recommend;
	}

	public Boolean getFinishedOnTime() {
		return finishedOnTime;
	}

	public void setFinishedOnTime(Boolean finishedOnTime) {
		this.finishedOnTime = finishedOnTime;
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
		ReviewOfWorker other = (ReviewOfWorker) obj;
		if (id != other.id)
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "ReviewOfWorker [id=" + id + ", workerReview=" + workerReview + ", workerRating=" + workerRating
				+ ", title=" + title + ", Recommend=" + Recommend + ", finishedOnTime=" + finishedOnTime + "]";
	}
	
}
