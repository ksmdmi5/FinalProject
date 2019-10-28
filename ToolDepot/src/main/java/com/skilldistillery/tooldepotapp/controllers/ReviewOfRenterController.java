package com.skilldistillery.tooldepotapp.controllers;

import java.security.Principal;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.tooldepotapp.entities.ReviewOfRenter;
import com.skilldistillery.tooldepotapp.services.ReviewOfRenterService;

@RestController
@CrossOrigin({ "*", "http://localhost:4242" })
@RequestMapping("api")
public class ReviewOfRenterController {

	@Autowired
	private ReviewOfRenterService reviewOfRenterSvc;

	@GetMapping("toolRental/{TRid}/reviewOfRenter")
	public ReviewOfRenter rentersReviewlist(@PathVariable("TRid") Integer TRid, HttpServletResponse resp) {
		ReviewOfRenter rentersReview = reviewOfRenterSvc.findRentersReview(TRid);
		return rentersReview;
	}
	
	@GetMapping("toolRental/{TRid}/reviewOfRenter/{RORid}")
	public ReviewOfRenter getRentersReview(@PathVariable("TRid") Integer TRid, @PathVariable("RORid") Integer RORid, HttpServletResponse resp) {
		ReviewOfRenter renterReview = reviewOfRenterSvc.findById(TRid, RORid);
		return renterReview;
	}
	
	@PostMapping("toolRental/{TRid}/reviewOfRenter")
	public ReviewOfRenter addRenterReview(Principal principal, @PathVariable("TRid") Integer TRid, @RequestBody ReviewOfRenter renterReview, HttpServletResponse resp, HttpServletRequest req) {
		try {
			renterReview = reviewOfRenterSvc.create(renterReview, TRid);
			if (renterReview == null) {
				resp.setStatus(404);
			} else {
				resp.setStatus(201);
				resp.setStatus(201);
				StringBuffer url = req.getRequestURL();
				url.append(renterReview.getId());
				resp.setHeader("Location", url.toString());

			}
		} catch (Exception e) {
			renterReview = null;
			resp.setStatus(400);
			e.printStackTrace();
		}
		return renterReview;
	}
	
	@PutMapping("toolRental/{TRid}/reviewOfRenter/{RORid}")
	public ReviewOfRenter editRenterReview(@PathVariable("TRid") Integer TRid, @PathVariable("RORid") Integer RORid, @RequestBody ReviewOfRenter reviewOfRenter, HttpServletResponse resp,
			HttpServletResponse req) {
		try {
			reviewOfRenter = reviewOfRenterSvc.update(TRid, RORid, reviewOfRenter);
			if (reviewOfRenter == null) {
				resp.setStatus(404);
			} else {
				resp.setStatus(201);
			}
		} catch (Exception e) {
			reviewOfRenter = null;
			resp.setStatus(400);
			e.printStackTrace();
		}
		return reviewOfRenter;
	}
	
	@DeleteMapping("toolRental/{TRid}/reviewOfRenter/{RORid}")
	public boolean destroyRenterReview(@PathVariable("TRid") Integer TRid, @PathVariable("RORid") Integer RORid, HttpServletResponse resp) {
		Boolean success = reviewOfRenterSvc.delete(TRid, RORid);
		try {
			if (success) {
				resp.setStatus(204);
			} else {
				resp.setStatus(404);
			}
		} catch (Exception e) {
			resp.setStatus(400);
			e.printStackTrace();
		}
		return success;

	}
}
