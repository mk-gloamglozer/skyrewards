package com.mkdevs.elegibilityservice;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class InvalidAccountException extends RuntimeException {

	private static final long serialVersionUID = 5363438646513359149L;
	
	public InvalidAccountException(String msg) {
		super("Account number "+ msg + " is invalid!");
	}
	
}
