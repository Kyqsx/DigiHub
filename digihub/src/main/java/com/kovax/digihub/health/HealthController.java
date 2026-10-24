package com.kovax.digihub.health;

import java.time.Instant;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/health")
public class HealthController {

	private final DatabaseHealthChecker databaseHealthChecker;
	private final String serviceName;

	public HealthController(DatabaseHealthChecker databaseHealthChecker,
			@Value("${spring.application.name}") String serviceName) {
		this.databaseHealthChecker = databaseHealthChecker;
		this.serviceName = serviceName;
	}

	/**
	 * Público e sem dados sensíveis: apenas indica se a API e o banco respondem.
	 * Retorna 503 quando o banco está indisponível.
	 */
	@GetMapping
	public ResponseEntity<HealthResponse> health() {
		boolean databaseUp = databaseHealthChecker.isUp();
		HealthResponse body = new HealthResponse(databaseUp ? "UP" : "DEGRADED", serviceName,
				databaseUp ? "UP" : "DOWN", Instant.now());
		return ResponseEntity.status(databaseUp ? HttpStatus.OK : HttpStatus.SERVICE_UNAVAILABLE).body(body);
	}
}
