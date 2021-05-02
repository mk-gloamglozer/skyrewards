package com.mkdevs.elegibilityservice;

public interface UserRepo {
	void saveUser(User user);
	User findByAccountNumber(String accNumber);
}
