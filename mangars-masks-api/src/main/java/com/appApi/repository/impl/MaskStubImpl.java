package com.appApi.repository.impl;

import com.appApi.repository.MaskRepository;
import com.appApi.model.Mask;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class MaskStubImpl implements MaskRepository {
	
	private Map<Long, Mask> masks;
	private Long idIndex;

	public MaskStubImpl() {
		// init
		masks = new HashMap<Long, Mask>();
		idIndex = 5L;
		
		Mask a = new Mask();
		masks.put(1L, a);
		Mask b = new Mask();
		masks.put(2L, b);
		Mask c = new Mask();
		masks.put(3L, c);
		Mask d = new Mask();
		masks.put(4L, d);
		Mask e = new Mask();
		masks.put(5L, e);
	}

	public List<Mask> list() {
		return new ArrayList<Mask>(masks.values());
	}

	public Mask create(Mask mask) {
		idIndex += idIndex;
		mask.setId(idIndex);
		masks.put(idIndex, mask);
		return mask;
	}

	public Mask get(Long id) {
		return masks.get(id);
	}

	public Mask update(Long id, Mask mask) {
		masks.put(id, mask);
		return mask;
	}

	public Mask delete(Long id) {
		return masks.remove(id);
	}
}
