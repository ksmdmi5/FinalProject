package com.skilldistillery.tooldepotapp.entities;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name="skill_rental")
public class SkillRental {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name="start_date")
	private LocalDateTime startDate;
	
	@Column(name="estimated_finish_date")
	private LocalDateTime estimatedFinishDate;
	
	@Column(name="finish_date")
	private LocalDateTime finishDate;
	
	private Integer hours;
	
	@CreationTimestamp
	@Column(name="create_date")
	private LocalDateTime createDate;
	
	@UpdateTimestamp
	@Column(name="update_date")
	private LocalDateTime updateDate;
	
	@ManyToOne
	@JoinColumn(name="renter_id")
	private User renter;
	
	@ManyToOne
	@JoinColumn(name="user_skill_id")
	private UserSkill userSkill;
	
	@OneToOne(mappedBy="skillRental")
	private ReviewOfWorker reviewOfWorker;
	
	@OneToOne(mappedBy="skillRental")
	private ReviewOfCustomer reviewOfCustomer;
	
	public SkillRental() {
		super();
	}

	public SkillRental(LocalDateTime startDate, LocalDateTime estimatedFinishDate, LocalDateTime finishDate,
			Integer hours, LocalDateTime createDate, LocalDateTime updateDate) {
		super();
		this.startDate = startDate;
		this.estimatedFinishDate = estimatedFinishDate;
		this.finishDate = finishDate;
		this.hours = hours;
		this.createDate = createDate;
		this.updateDate = updateDate;
	}



	public SkillRental(LocalDateTime startDate, LocalDateTime estimatedFinishDate, LocalDateTime finishDate,
			Integer hours, LocalDateTime createDate, LocalDateTime updateDate, User renter, UserSkill userSkill,
			ReviewOfWorker reviewOfWorker, ReviewOfCustomer reviewOfCustomer) {
		super();
		this.startDate = startDate;
		this.estimatedFinishDate = estimatedFinishDate;
		this.finishDate = finishDate;
		this.hours = hours;
		this.createDate = createDate;
		this.updateDate = updateDate;
		this.renter = renter;
		this.userSkill = userSkill;
		this.reviewOfWorker = reviewOfWorker;
		this.reviewOfCustomer = reviewOfCustomer;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public LocalDateTime getStartDate() {
		return startDate;
	}

	public void setStartDate(LocalDateTime startDate) {
		this.startDate = startDate;
	}

	public LocalDateTime getFinishDate() {
		return finishDate;
	}

	public void setFinishDate(LocalDateTime finishDate) {
		this.finishDate = finishDate;
	}

	public Integer getHours() {
		return hours;
	}

	public void setHours(Integer hours) {
		this.hours = hours;
	}

	public User getRenter() {
		return renter;
	}

	public void setRenter(User renter) {
		this.renter = renter;
	}

	public UserSkill getUserSkill() {
		return userSkill;
	}

	public void setUserSkill(UserSkill userSkill) {
		this.userSkill = userSkill;
	}
	
	public ReviewOfWorker getReviewOfWorker() {
		return reviewOfWorker;
	}

	public void setReviewOfWorker(ReviewOfWorker reviewOfWorker) {
		this.reviewOfWorker = reviewOfWorker;
	}

	public ReviewOfCustomer getReviewOfCustomer() {
		return reviewOfCustomer;
	}

	public void setReviewOfCustomer(ReviewOfCustomer reviewOfCustomer) {
		this.reviewOfCustomer = reviewOfCustomer;
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
	
	public LocalDateTime getEstimatedFinishDate() {
		return estimatedFinishDate;
	}

	public void setEstimatedFinishDate(LocalDateTime estimatedFinishDate) {
		this.estimatedFinishDate = estimatedFinishDate;
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
		SkillRental other = (SkillRental) obj;
		if (id != other.id)
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "SkillRental [id=" + id + ", startDate=" + startDate + ", estimatedFinishDate=" + estimatedFinishDate
				+ ", finishDate=" + finishDate + ", hours=" + hours + ", createDate=" + createDate + ", updateDate="
				+ updateDate + ", renter=" + renter + ", userSkill=" + userSkill + ", reviewOfWorker=" + reviewOfWorker
				+ ", reviewOfCustomer=" + reviewOfCustomer + "]";
	}
}
