package com.kovax.digihub.common.exception;

import org.springframework.http.HttpStatus;

/**
 * Exceção de negócio esperada. A mensagem é exibida ao cliente, portanto deve ser segura.
 */
public class ApiException extends RuntimeException {

	private final HttpStatus status;
	private final String code;

	public ApiException(HttpStatus status, String code, String message) {
		super(message);
		this.status = status;
		this.code = code;
	}

	public HttpStatus getStatus() {
		return status;
	}

	public String getCode() {
		return code;
	}
}
