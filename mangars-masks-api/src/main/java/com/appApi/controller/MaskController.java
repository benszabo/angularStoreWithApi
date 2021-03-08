package com.appApi.controller;

import com.appApi.model.Mask;
import com.appApi.service.MaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("api/v1/")
public class MaskController {
	
	@Autowired
	private MaskService maskService;

	public MaskController() {}

	@RequestMapping("/test")
	public String test() {
		return "testing";
	}
	
	@RequestMapping(value = "masks", method = RequestMethod.GET)
	public List<Mask> list() { return maskService.getMasks(); }
	
	@RequestMapping(value = "masks", method = RequestMethod.POST)
	public Mask create(@RequestBody Mask mask) {
		return maskService.createMask(mask);
	}
	
	@RequestMapping(value = "masks/{id}", method = RequestMethod.GET)
	public Mask get(@PathVariable Long id) {
		return maskService.getMaskById(id);
	}
	
	@RequestMapping(value = "masks/{id}", method = RequestMethod.PUT)
	public Mask update(@PathVariable Long id, @RequestBody Mask mask) {
		return maskService.updateMaskById(id, mask);
	}
	
	@RequestMapping(value = "masks/{id}", method = RequestMethod.DELETE)
	public Mask delete(@PathVariable Long id) {
		return maskService.deleteMaskById(id);
	}
}
