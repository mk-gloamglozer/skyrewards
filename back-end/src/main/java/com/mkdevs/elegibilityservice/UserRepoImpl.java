package com.mkdevs.elegibilityservice;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Component;

@Component
public class UserRepoImpl implements UserRepo{

	private Map<String, User> users = new HashMap<String, User>();

	@Override
	public void saveUser(User user) {
		users.put(user.getAccoutNumber(), user);
	}

	@Override
	public User findByAccountNumber(String accNumber) {
		User user = users.get(accNumber);
		if (user == null) {
			throw new InvalidAccountException(accNumber);
		}
		return user;
	}

}
