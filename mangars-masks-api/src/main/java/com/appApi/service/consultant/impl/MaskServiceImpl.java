package com.appApi.service.consultant.impl;

import com.appApi.model.Mask;
import com.appApi.repository.MaskRepository;
import com.appApi.service.MaskService;
import com.appApi.repository.MaskRepository;
import com.appApi.service.MaskService;
import com.appApi.model.Mask;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MaskServiceImpl implements MaskService {
	
	@Autowired
	private MaskRepository maskRepository;
	
	@Override
	public List<Mask> getMasks() {
		return maskRepository.list();
	}

	@Override
	public Mask createMask(Mask mask) {
		return maskRepository.create(mask);
	}

	@Override
	public Mask getMaskById(Long id) {
		return maskRepository.get(id);
	}

	@Override
	public Mask updateMaskById(Long id, Mask mask) {
		return maskRepository.update(id, mask);
	}

	@Override
	public Mask deleteMaskById(Long id) {
		return maskRepository.delete(id);
	}
}