# Decisões da Etapa 1

- **Pacote Java:** mantido `com.kovax.digihub` (gerado no Initializr) em vez de `br.com.digihub`. Módulos entram como subpacotes.
- **Pastas:** mantidos `digihub/` (backend) e `digihub_web/` (frontend) para não quebrar o existente.
- **Java 25 / Spring Boot 4.1.2:** conforme o projeto gerado. Starters modulares do Boot 4 (`starter-webmvc`, `starter-flyway`, `starter-security-test`); Flyway exige também `flyway-database-postgresql`.
- **Adiados para a Etapa 2:** biblioteca JWT, Springdoc OpenAPI e Testcontainers (compatibilidade com Boot 4 a confirmar ao compilar; não havia acesso ao Maven Central).
- **Segurança atual:** tudo negado, exceto `GET /api/v1/health` e `/actuator/health`. CSRF desativado só porque ainda não há sessão/cookie; será decidido com a autenticação.
- **Erros:** formato único `ApiError`; erros inesperados nunca expõem detalhes.
- **Frontend:** `@hookform/resolvers` fixado em 5.x (a 6.0.0 gerou conflito de peer dependencies). Removidos `@types/react*` (JavaScript puro).
- **Home/catálogo:** categorias estáticas e temporárias; produtos mostram estados vazios porque não há API de catálogo. Sem dados fictícios.
- **Bundle:** chunk principal ~527 kB (163 kB gzip); otimizar nas próximas etapas.
