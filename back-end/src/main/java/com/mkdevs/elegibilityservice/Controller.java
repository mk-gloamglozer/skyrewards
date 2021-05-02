package com.mkdevs.elegibilityservice;

import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;
import static org.springframework.http.HttpStatus.NOT_FOUND;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api", produces = APPLICATION_JSON_VALUE)
public class Controller {
	
	@Autowired
	private UserRepo userRepo;
	
	@GetMapping("/{acc_number}")
	public ResponseEntity<String> getElegibility(@PathVariable(name = "acc_number") String accNumber){

		return ResponseEntity
				.ok(userRepo
						.findByAccountNumber(accNumber)
						.getElegibility()
					);
	}
	
	@ExceptionHandler(TechnicalFaliureException.class)
	public ResponseEntity<String> handleTechnicalError(TechnicalFaliureException ex){
		return ResponseEntity.status(INTERNAL_SERVER_ERROR).body(ex.getMessage());
	}
	
	@ExceptionHandler(InvalidAccountException.class)
	public ResponseEntity<String> handleInvalidAccount(InvalidAccountException ex){
		return ResponseEntity.status(NOT_FOUND).body(ex.getMessage());
	}
	

}
