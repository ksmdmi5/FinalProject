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

import com.skilldistillery.tooldepotapp.entities.ReviewOfLender;
import com.skilldistillery.tooldepotapp.services.ReviewOfLenderService;

@RestController
@CrossOrigin({ "*", "http://localhost:4242" })
@RequestMapping("api")
public class ReviewOfLenderController {


	@Autowired
	private ReviewOfLenderService reviewOfLenderSvc;

	@GetMapping("toolRental/{TRid}/reviewOfLender")
	public ReviewOfLender lendersReviewlist(@PathVariable("TRid") Integer TRid, HttpServletResponse resp) {
		ReviewOfLender lendersReview = reviewOfLenderSvc.findLendersReview(TRid);
		if (lendersReview == null) {
			resp.setStatus(404);
		}
		return lendersReview;
	}
	
	@GetMapping("toolRental/{TRid}/reviewOfLender/{ROLid}")
	public ReviewOfLender getLendersReview(@PathVariable("TRid") Integer TRid, @PathVariable("ROLid") Integer ROLid, HttpServletResponse resp) {
		ReviewOfLender lenderReview = reviewOfLenderSvc.findById(TRid, ROLid);
		return lenderReview;
	}
	
	@PostMapping("toolRental/{TRid}/reviewOfLender")
	public ReviewOfLender addLenderReview(Principal principal, @PathVariable("TRid") Integer TRid, @RequestBody ReviewOfLender lenderReview, HttpServletResponse resp, HttpServletRequest req) {
		try {
			lenderReview = reviewOfLenderSvc.create(lenderReview, TRid);
			if (lenderReview == null) {
				resp.setStatus(404);
			} else {
				resp.setStatus(201);
				StringBuffer url = req.getRequestURL();
				url.append(lenderReview.getId());
				resp.setHeader("Location", url.toString());

			}
		} catch (Exception e) {
			lenderReview = null;
			resp.setStatus(400);
			e.printStackTrace();
		}
		return lenderReview;
	}
	
	@PutMapping("toolRental/{TRid}/reviewOfLender/{ROLid}")
	public ReviewOfLender editLenderReview(@PathVariable("TRid") Integer TRid, @PathVariable("ROLid") Integer ROLid, @RequestBody ReviewOfLender lenderReview, HttpServletResponse resp,
			HttpServletResponse req) {
		try {
			lenderReview = reviewOfLenderSvc.update(TRid, ROLid, lenderReview);
			if (lenderReview == null) {
				resp.setStatus(404);
			} else {
				resp.setStatus(201);
			}
		} catch (Exception e) {
			lenderReview = null;
			resp.setStatus(400);
			e.printStackTrace();
		}
		return lenderReview;
	}
	
	@DeleteMapping("toolRental/{TRid}/reviewOfLender/{ROLid}")
	public Boolean destroyLenderReview(@PathVariable("TRid") Integer TRid, @PathVariable("ROLid") Integer ROLid, HttpServletResponse resp) {
		Boolean success = reviewOfLenderSvc.delete(TRid, ROLid);
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
