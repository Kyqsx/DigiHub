package com.kovax.digihub.health;

import org.junit.jupiter.api.Test;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class HealthControllerTest {

	private MockMvc mvcWith(boolean databaseUp) {
		DatabaseHealthChecker checker = mock(DatabaseHealthChecker.class);
		when(checker.isUp()).thenReturn(databaseUp);
		return MockMvcBuilders.standaloneSetup(new HealthController(checker, "digihub")).build();
	}

	@Test
	void returnsUpWhenDatabaseResponds() throws Exception {
		mvcWith(true).perform(get("/api/v1/health"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.status").value("UP"))
				.andExpect(jsonPath("$.database").value("UP"))
				.andExpect(jsonPath("$.service").value("digihub"));
	}

	@Test
	void returns503WhenDatabaseIsDown() throws Exception {
		mvcWith(false).perform(get("/api/v1/health"))
				.andExpect(status().isServiceUnavailable())
				.andExpect(jsonPath("$.status").value("DEGRADED"))
				.andExpect(jsonPath("$.database").value("DOWN"));
	}
}
