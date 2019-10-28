package com.skilldistillery.tooldepotapp.controllers;

import java.security.Principal;
import java.util.List;

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

import com.skilldistillery.tooldepotapp.entities.ToolPhoto;
import com.skilldistillery.tooldepotapp.services.ToolPhotoService;

@RestController
@CrossOrigin({ "*", "http://localhost:4242" })
@RequestMapping("api")
public class ToolPhotoController {

	@Autowired
	private ToolPhotoService photoSvc;
	
	@GetMapping("tool/{tid}/toolPhoto")
	public List<ToolPhoto> getPhotosForTool(@PathVariable("tid")Integer tid, HttpServletResponse resp) {
		List<ToolPhoto> toolPhotos = photoSvc.findAllPhotos(tid);
		return toolPhotos;
	}
	@GetMapping("tool/{tid}/toolPhoto/{tpid}")
	public ToolPhoto getPhoto(@PathVariable("tid") Integer tid, @PathVariable("tpid") Integer tpid,
								HttpServletResponse resp, HttpServletRequest req) {
		ToolPhoto toolPhoto = photoSvc.findById(tid, tpid);
		return toolPhoto;
	}
	@PostMapping("tool/{tid}/toolPhoto")
	public ToolPhoto addToolPhoto(Principal principal, @PathVariable("tid") Integer tid,
			@RequestBody ToolPhoto toolPhoto, HttpServletRequest req, HttpServletResponse resp) {
		try {
			toolPhoto = photoSvc.create(toolPhoto, tid);
			if (toolPhoto == null) {
				resp.setStatus(404);
			} else {
				resp.setStatus(201);
				StringBuffer url = req.getRequestURL();
				url.append(toolPhoto.getId());
				resp.setHeader("location", url.toString());
			}
		} catch (Exception e) {
			toolPhoto = null;
			resp.setStatus(400);
			e.printStackTrace();
		}
		return toolPhoto;
	}
	@PutMapping("tool/{tid}/toolPhoto/{tpid}")
	public ToolPhoto editToolPhoto(@PathVariable("tid") Integer tid, @PathVariable("tpid") Integer tpid,
	HttpServletResponse resp, HttpServletRequest req, @RequestBody ToolPhoto toolPhoto) {
		try {
			toolPhoto = photoSvc.update(tid, tpid, toolPhoto);
			if (toolPhoto == null) {
				resp.setStatus(404);
			} else {
				resp.setStatus(201);
			}
		} catch (Exception e) {
			toolPhoto = null;
			resp.setStatus(400);
			e.printStackTrace();
		}
		return toolPhoto;
	}
	@DeleteMapping("tool/{tid}/toolPhoto/{tpid}")
	public Boolean destroyToolPhoto(@PathVariable("tid") Integer tid, @PathVariable("tpid") Integer tpid,
			HttpServletResponse resp) { 
		Boolean success = photoSvc.delete(tid, tpid);
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
