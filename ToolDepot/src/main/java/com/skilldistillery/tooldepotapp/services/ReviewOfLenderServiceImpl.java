package com.skilldistillery.tooldepotapp.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.tooldepotapp.entities.ReviewOfLender;
import com.skilldistillery.tooldepotapp.entities.ToolRental;
import com.skilldistillery.tooldepotapp.repositories.ReviewOfLenderRepository;

@Service
public class ReviewOfLenderServiceImpl implements ReviewOfLenderService {

	@Autowired
	private ReviewOfLenderRepository lendReviewRepo;
	@Autowired
	private ToolRentalService toolRentalSvc;

	@Override
	public ReviewOfLender findById(Integer TRid, Integer ROLid) {
		ReviewOfLender reviewOfLender = lendReviewRepo.findByToolRentalIdAndId(TRid, ROLid);
		return reviewOfLender;
	}

	@Override
	public ReviewOfLender findLendersReview(Integer TRid) {
		ReviewOfLender lendersReview = lendReviewRepo.findByToolRentalId(TRid);
		return lendersReview;
	}

	@Override
	public ReviewOfLender create(ReviewOfLender reviewOfLender, Integer TRid) {
		reviewOfLender.setToolRental(toolRentalSvc.findById(TRid));
		return lendReviewRepo.saveAndFlush(reviewOfLender);
	}

	@Override
	public ReviewOfLender update(Integer TRid, Integer ROLid, ReviewOfLender reviewOfLender) {
		ReviewOfLender editReviewOfLender = findById(TRid, ROLid);
		if (editReviewOfLender != null) {
			reviewOfLender.setToolRental(editReviewOfLender.getToolRental());
			editReviewOfLender.setRenterRating(reviewOfLender.getRenterRating());
			editReviewOfLender.setRenterReview(reviewOfLender.getRenterReview());
		}
		return lendReviewRepo.saveAndFlush(editReviewOfLender);
	}

	@Override
	public Boolean delete(Integer TRid, Integer ROLid) {
		Boolean deleted = false;
		ToolRental toolRental = toolRentalSvc.findById(TRid);
		if (toolRental.getLenderReview().getId() == ROLid) {
			if (lendReviewRepo.existsById(ROLid)) {
				lendReviewRepo.findById(ROLid).get().setToolRental(null);
				lendReviewRepo.deleteById(ROLid);
				deleted = true;
			}
		}
		return deleted;
	}
}
