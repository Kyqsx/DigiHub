package com.kovax.digihub.config;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import static org.assertj.core.api.Assertions.assertThat;

class CorsConfigurationTest {

	private final CorsConfigurationSource source = new SecurityConfig()
			.corsConfigurationSource(new CorsProperties(List.of("http://localhost:5173")));

	@Test
	void allowsOnlyConfiguredOrigins() {
		CorsConfiguration cors = source.getCorsConfiguration(new MockHttpServletRequest("GET", "/api/v1/health"));

		assertThat(cors).isNotNull();
		assertThat(cors.checkOrigin("http://localhost:5173")).isEqualTo("http://localhost:5173");
		assertThat(cors.checkOrigin("https://evil.example")).isNull();
		assertThat(cors.getAllowedOrigins()).doesNotContain("*");
	}

	@Test
	void doesNotApplyCorsOutsideApiPrefix() {
		assertThat(source.getCorsConfiguration(new MockHttpServletRequest("GET", "/outro"))).isNull();
	}
}
