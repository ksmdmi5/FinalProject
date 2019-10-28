package com.skilldistillery.tooldepotapp.entities;

import java.time.LocalDateTime;

import javax.persistence.CascadeType;
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

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


@Entity
@Table(name="tool_rental")
public class ToolRental {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@JsonIgnoreProperties("rentals")
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "tool_id")
	private Tool tool;
	
	private LocalDateTime checkout;
	private LocalDateTime returned;
	
	@Column(name="total_cost")
	private double totalCost;
	
	@CreationTimestamp
	@Column(name="created_date")
	private LocalDateTime createDate;
	
	@UpdateTimestamp
	@Column(name="updated_date")
	private LocalDateTime updateDate;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "renter_id")
	private User renter;
	
	@OneToOne(mappedBy="toolRental")
	private ReviewOfLender lenderReview;
	
	@OneToOne(mappedBy="toolRental")
	private ReviewOfRenter renterReview;
	
	public ToolRental() {}

	public ToolRental(Tool tool, LocalDateTime checkout, LocalDateTime returned, double totalCost,
			LocalDateTime createDate, LocalDateTime updateDate, User renter) {
		super();
		this.tool = tool;
		this.checkout = checkout;
		this.returned = returned;
		this.totalCost = totalCost;
		this.createDate = createDate;
		this.updateDate = updateDate;
		this.renter = renter;
	}

	public ToolRental(Tool tool, LocalDateTime checkout, LocalDateTime returned, double totalCost,
			LocalDateTime createDate, LocalDateTime updateDate) {
		super();
		this.tool = tool;
		this.checkout = checkout;
		this.returned = returned;
		this.totalCost = totalCost;
		this.createDate = createDate;
		this.updateDate = updateDate;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Tool getTool() {
		return tool;
	}

	public void setTool(Tool tool) {
		this.tool = tool;
	}

	public LocalDateTime getCheckout() {
		return checkout;
	}

	public void setCheckout(LocalDateTime checkout) {
		this.checkout = checkout;
	}

	public LocalDateTime getReturned() {
		return returned;
	}

	public void setReturned(LocalDateTime returned) {
		this.returned = returned;
	}

	public double getTotalCost() {
		return totalCost;
	}

	public void setTotalCost(double totalCost) {
		this.totalCost = totalCost;
	}

	public User getRenter() {
		return renter;
	}

	public void setRenter(User renter) {
		this.renter = renter;
	}

	public ReviewOfLender getLenderReview() {
		return lenderReview;
	}

	public void setLenderReview(ReviewOfLender lenderReview) {
		this.lenderReview = lenderReview;
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

	public ReviewOfRenter getRenterReview() {
		return renterReview;
	}

	public void setRenterReview(ReviewOfRenter renterReview) {
		this.renterReview = renterReview;
	}

	@Override
	public String toString() {
		return "ToolRental [id=" + id + ", tool=" + tool + ", checkout=" + checkout + ", returned=" + returned
				+ ", totalCost=" + totalCost + ", createDate=" + createDate + ", updateDate=" + updateDate + ", renter="
				+ renter + ", lenderReview=" + lenderReview + ", renterReview=" + renterReview + "]";
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
		ToolRental other = (ToolRental) obj;
		if (id != other.id)
			return false;
		return true;
	}
	
}
