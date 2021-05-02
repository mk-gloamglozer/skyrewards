package com.mkdevs.elegibilityservice;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class ErrorThrowingUser implements User{

	private final String accNumberHandled;

	@Autowired private UserRepo adapter;

	@PostConstruct
	private void setup() {
		adapter.saveUser(this);
	}

	@Override
	public String getAccoutNumber() {
		return accNumberHandled;
	}

	@Override
	public String getElegibility() {
		throw new TechnicalFaliureException(accNumberHandled);
	}

}
