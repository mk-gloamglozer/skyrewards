package com.mkdevs.elegibilityservice;

public class TechnicalFaliureException extends RuntimeException {
	private static final long serialVersionUID = -6209708212061322439L;

	public TechnicalFaliureException(String msg) {
		super("Something went wrong processing " + msg);
	}
}
