package com.skilldistillery.tooldepotapp.services;

import com.skilldistillery.tooldepotapp.entities.ReviewOfLender;

public interface ReviewOfLenderService {

	ReviewOfLender findById(Integer TRid, Integer ROLid);
	
	ReviewOfLender findLendersReview(Integer TRid);

	ReviewOfLender create(ReviewOfLender reviewOfLender, Integer id);

	ReviewOfLender update(Integer TRid, Integer ROLid, ReviewOfLender reviewOfLender);

	Boolean delete(Integer TRid, Integer ROLid);
}
