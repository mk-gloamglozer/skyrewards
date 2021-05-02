package com.mkdevs.elegibilityservice;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class StandardUser implements User {
	private final String accNumberHandled;
	private final Eligibility eligibility;
	
	@Autowired
	private UserRepo adapter;
	
	@PostConstruct
	public void registerWithAdapter() {
		adapter.saveUser(this);
	}

	@Override
	public String getAccoutNumber() {
		return accNumberHandled;
	}

	@Override
	public String getElegibility() {
		return eligibility.name();
	}
	
	public enum Eligibility{
		CUSTOMER_ELIGIBLE,
		CUSTOMER_INELIGIBLE
	}

}
