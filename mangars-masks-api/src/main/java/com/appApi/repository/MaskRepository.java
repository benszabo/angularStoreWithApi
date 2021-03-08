package com.appApi.repository;

import com.appApi.model.Mask;
import java.util.List;

public interface MaskRepository {
	
	List<Mask> list();
	Mask create(Mask mask);
	Mask get(Long id);
	Mask update(Long id, Mask mask);
	Mask delete(Long id);
}
