package com.appApi.service;

import com.appApi.model.Mask;
import java.util.List;

public interface MaskService {
	
	List<Mask> getMasks();
	Mask createMask(Mask mask);
	Mask getMaskById(Long id);
	Mask updateMaskById(Long id, Mask mask);
	Mask deleteMaskById(Long id);
}