package com.skilldistillery.tooldepotapp.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.tooldepotapp.entities.ReviewOfRenter;
import com.skilldistillery.tooldepotapp.entities.ToolRental;
import com.skilldistillery.tooldepotapp.repositories.ReviewOfRenterRepository;

@Service
public class ReviewOfRenterServiceImpl implements ReviewOfRenterService {

	@Autowired
	private ReviewOfRenterRepository rentReviewRepo;
	@Autowired
	private ToolRentalService toolRentalSvc;

	@Override
	public ReviewOfRenter findById(Integer TRid, Integer RORid) {
		ReviewOfRenter reviewOfRenter = rentReviewRepo.findByToolRentalIdAndId(TRid, RORid);
		return reviewOfRenter;
	}

	@Override
	public ReviewOfRenter findRentersReview(Integer TRid) {
		ReviewOfRenter rentersReview = rentReviewRepo.findByToolRentalId(TRid);
		return rentersReview;
	}

	@Override
	public ReviewOfRenter create(ReviewOfRenter reviewOfRenter, Integer TRid) {
		reviewOfRenter.setToolRental(toolRentalSvc.findById(TRid));
		return rentReviewRepo.saveAndFlush(reviewOfRenter);
	}
	
	@Override
	public ReviewOfRenter update(Integer TRid, Integer RORid, ReviewOfRenter reviewOfRenter) {
		ReviewOfRenter editReviewOfRenter = findById(TRid, RORid);
		if (editReviewOfRenter != null) {
			reviewOfRenter.setToolRental(editReviewOfRenter.getToolRental());
			editReviewOfRenter.setLenderRating(reviewOfRenter.getLenderRating());
			editReviewOfRenter.setLenderReview(reviewOfRenter.getLenderReview());
			editReviewOfRenter.setToolRating(reviewOfRenter.getToolRating());
			editReviewOfRenter.setToolReview(reviewOfRenter.getToolReview());
		}
		return rentReviewRepo.saveAndFlush(editReviewOfRenter);
	}

	@Override
	public Boolean delete(Integer TRid, Integer RORid) {
		Boolean deleted = false;
		ToolRental toolRental = toolRentalSvc.findById(TRid);
		if (toolRental.getRenterReview().getId() == RORid) {
			if (rentReviewRepo.existsById(RORid)) {
				rentReviewRepo.findById(RORid).get().setToolRental(null);
				rentReviewRepo.deleteById(RORid);
				deleted = true;
			}
		}
		return deleted;
	}
}
