package com.mkdevs.elegibilityservice;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.mkdevs.elegibilityservice.StandardUser.Eligibility;

@Configuration
public class UserRepoConfigurer {

	@Bean(name = "handler_111")
	public User basicUser() {
		return new StandardUser("111", Eligibility.CUSTOMER_ELIGIBLE);
	}
	
	@Bean(name = "handler_666")
	public User devilUser() {
		return new StandardUser("666", Eligibility.CUSTOMER_INELIGIBLE);
	}
	
	@Bean(name = "Internal_error_handler")
	public User policeUser() {
		return new ErrorThrowingUser("999");
	}

}
