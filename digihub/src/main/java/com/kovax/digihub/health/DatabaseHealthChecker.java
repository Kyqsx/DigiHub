package com.kovax.digihub.health;

import java.sql.Connection;
import java.sql.SQLException;

import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class DatabaseHealthChecker {

	private static final Logger log = LoggerFactory.getLogger(DatabaseHealthChecker.class);
	private static final int TIMEOUT_SECONDS = 2;

	private final DataSource dataSource;

	public DatabaseHealthChecker(DataSource dataSource) {
		this.dataSource = dataSource;
	}

	public boolean isUp() {
		try (Connection connection = dataSource.getConnection()) {
			return connection.isValid(TIMEOUT_SECONDS);
		}
		catch (SQLException ex) {
			log.warn("Verificação de saúde do banco falhou: {}", ex.getClass().getSimpleName());
			return false;
		}
	}
}
