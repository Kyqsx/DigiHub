package com.kovax.digihub.common;

import com.kovax.digihub.common.exception.ApiException;
import com.kovax.digihub.common.exception.GlobalExceptionHandler;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.hamcrest.Matchers.not;
import static org.hamcrest.Matchers.containsString;

class GlobalExceptionHandlerTest {

	@RestController
	static class ThrowingController {

		@GetMapping("/business")
		String business() {
			throw new ApiException(HttpStatus.CONFLICT, "EXEMPLO", "Conflito de exemplo.");
		}

		@GetMapping("/boom")
		String boom() {
			throw new IllegalStateException("segredo interno: jdbc:postgresql://host/db");
		}
	}

	private MockMvc mvc;

	@BeforeEach
	void setUp() {
		mvc = MockMvcBuilders.standaloneSetup(new ThrowingController())
				.setControllerAdvice(new GlobalExceptionHandler())
				.build();
	}

	@Test
	void mapsBusinessExceptionToItsStatusAndCode() throws Exception {
		mvc.perform(get("/business"))
				.andExpect(status().isConflict())
				.andExpect(jsonPath("$.code").value("EXEMPLO"))
				.andExpect(jsonPath("$.message").value("Conflito de exemplo."))
				.andExpect(jsonPath("$.path").value("/business"));
	}

	@Test
	void hidesInternalDetailsOnUnexpectedErrors() throws Exception {
		mvc.perform(get("/boom"))
				.andExpect(status().isInternalServerError())
				.andExpect(jsonPath("$.code").value("INTERNAL_ERROR"))
				.andExpect(content().string(not(containsString("jdbc"))));
	}
}
