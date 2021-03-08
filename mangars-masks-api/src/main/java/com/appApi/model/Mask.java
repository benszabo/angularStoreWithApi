package com.appApi.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Mask {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String name;
	private String description;
	private double price;

	public Mask() {}

	public Mask(Long id, String name, String description, double price) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.price = price;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}


	public String getName() { return name; }

	public void setName(String name) { this.name = name; }

	public String getDescription() { return description; }

	public void setDescription(String description) { this.description = description; }

	public double getPrice() { return price; }

	public void setPrice(double price) { this.price = price; }

	@Override
	public String toString() {
		return String.format("Mask Id: %s\nName: %s\nDescription: %s\nPrice: %d\n\n",
				id, name, description, price);
	}
}