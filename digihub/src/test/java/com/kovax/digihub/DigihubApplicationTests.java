package com.kovax.digihub;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * O teste de contexto completo exige um PostgreSQL real (Flyway + Hikari). Ele será adicionado com
 * Testcontainers quando houver Docker disponível. Até lá, validamos a classe principal e os
 * componentes isoladamente.
 */
class DigihubApplicationTests {

	@Test
	void mainClassExists() {
		assertThat(DigihubApplication.class).isNotNull();
	}
}
