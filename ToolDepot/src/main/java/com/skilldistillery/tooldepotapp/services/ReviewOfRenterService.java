package com.skilldistillery.tooldepotapp.services;

import com.skilldistillery.tooldepotapp.entities.ReviewOfRenter;

public interface ReviewOfRenterService {

	ReviewOfRenter findById(Integer TRid, Integer RORid);
	
	ReviewOfRenter findRentersReview(Integer TRid);

	ReviewOfRenter update(Integer TRid, Integer RORid, ReviewOfRenter reviewOfRenter);

	ReviewOfRenter create(ReviewOfRenter reviewOfRenter, Integer TRid);

	Boolean delete(Integer TRid, Integer RORid);
}
