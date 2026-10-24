package com.kovax.digihub.common.exception;

import java.time.Instant;
import java.util.List;

/**
 * Formato padrão de erro da API. Nunca carrega detalhes internos (stack trace, SQL, etc.).
 */
public record ApiError(
		Instant timestamp,
		int status,
		String code,
		String message,
		String path,
		List<FieldViolation> violations) {

	public record FieldViolation(String field, String message) {
	}

	public static ApiError of(int status, String code, String message, String path) {
		return new ApiError(Instant.now(), status, code, message, path, List.of());
	}

	public static ApiError of(int status, String code, String message, String path,
			List<FieldViolation> violations) {
		return new ApiError(Instant.now(), status, code, message, path, violations);
	}
}
