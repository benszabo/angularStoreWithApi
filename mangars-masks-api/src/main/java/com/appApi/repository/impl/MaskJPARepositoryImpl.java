package com.appApi.repository.impl;

import com.appApi.model.Mask;
import com.appApi.repository.MaskRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Repository;

import java.util.List;

@Primary
@Repository
public class MaskJPARepositoryImpl implements MaskRepository {
	
	@Autowired
	@Lazy
	private MaskJPARepository maskJPARepository;
	
	@Override
	public List<Mask> list() { return maskJPARepository.findAll(); }

	@Override
	public Mask create(Mask mask) {
		return maskJPARepository.saveAndFlush(mask);
	}

	@Override
	public Mask get(Long id) {
		return maskJPARepository.findById(id).get();
	}

	@Override
	public Mask update(Long id, Mask mask) {
		Mask existingMask = maskJPARepository.findById(id).get();
		BeanUtils.copyProperties(mask, existingMask);
		return maskJPARepository.saveAndFlush(existingMask);
	}

	@Override
	public Mask delete(Long id) {
		Mask existingMask = maskJPARepository.findById(id).get();
		maskJPARepository.delete(existingMask);
		return existingMask;
	}
}