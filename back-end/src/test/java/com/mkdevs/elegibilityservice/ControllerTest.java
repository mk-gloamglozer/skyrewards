package com.mkdevs.elegibilityservice;

import static org.hamcrest.CoreMatchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
public class ControllerTest {
	
	@Autowired 
	private MockMvc mockMvc;

	@Test
	public void accNumberShouldReturnEligibility() throws Exception {
		mockMvc.perform(get("/api/111"))
			.andDo(print())
			.andExpect(status().isOk())
			.andExpect(content().string(containsString("CUSTOMER_ELIGIBLE")));

		mockMvc.perform(get("/api/666"))
			.andDo(print())
			.andExpect(status().isOk())
			.andExpect(content().string(containsString("CUSTOMER_INELIGIBLE")));

	}
	
	@Test
	public void accNumberShouldHaveErrorIfNotFound() throws Exception{
		
		mockMvc.perform(get("/api/444"))
			.andDo(print())
			.andExpect(status().isNotFound())
			.andExpect(content().string(containsString("444")));
	}
	
	@Test
	public void accNumberShouldHaveErrorIfTechnicalProblem() throws Exception{
		
		mockMvc.perform(get("/api/999"))
			.andDo(print())
			.andExpect(status().isInternalServerError())
			.andExpect(content().string(containsString("999")));
	}
}
