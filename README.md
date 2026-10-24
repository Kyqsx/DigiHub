# DigiHub

Marketplace brasileiro de produtos digitais. Monorepo com:

| Pasta | O quê |
|---|---|
| `digihub/` | Backend: Java 25, Spring Boot 4.1.2, Maven, PostgreSQL (Supabase), Flyway |
| `digihub_web/` | Frontend: React 19, Vite 8, JavaScript (sem TypeScript), Tailwind CSS 4 |
| `docs/` | Arquitetura, banco, deploy |

**Estado: Etapa 1 (Fundação).** Há health check, CORS, tratamento de erros, migration inicial e layout público. Autenticação, catálogo, pedidos e pagamentos ainda não existem.

## Requisitos
- JDK 25 (o `pom.xml` exige `java.version=25`); Maven ou o `mvnw` incluso
- Node.js 22+ e npm
- Um projeto Supabase (plano Free serve)

## 1. Banco (Supabase)
1. Crie o projeto no Supabase.
2. Clique em **Connect** e copie os dados. Use o **Session pooler** (porta 5432, IPv4) ou a conexão direta (exige IPv6 ou add-on IPv4). Não use o Transaction pooler (6543).
3. Veja `docs/database/supabase.md`.

## 2. Backend
```bash
cd digihub
cp .env.example .env        # PowerShell: Copy-Item .env.example .env
# edite .env com URL, usuário e senha do Supabase
./mvnw spring-boot:run      # Windows: .\mvnw.cmd spring-boot:run
```
O perfil `dev` é o padrão e lê o arquivo `.env`. Em produção use `SPRING_PROFILES_ACTIVE=prod` com variáveis reais.

Verifique: `http://localhost:8080/api/v1/health` deve responder `{"status":"UP","database":"UP",...}`.

Testes: `./mvnw test` (não precisam de banco).

## 3. Frontend
```bash
cd digihub_web
cp .env.example .env
npm install
npm run dev        # http://localhost:5173
npm test           # Vitest
npm run lint
npm run build
```
O rodapé mostra o estado da API.

## Variáveis de ambiente
| Onde | Variável | Obrigatória | Descrição |
|---|---|---|---|
| backend | `SPRING_DATASOURCE_URL` | sim | URL JDBC do Supabase com `sslmode=require` |
| backend | `SPRING_DATASOURCE_USERNAME` | sim | ex.: `postgres.<project-ref>` no pooler |
| backend | `SPRING_DATASOURCE_PASSWORD` | sim | senha do banco |
| backend | `CORS_ALLOWED_ORIGINS` | prod | origens do frontend, separadas por vírgula |
| backend | `DB_POOL_MAX_SIZE`, `PORT` | não | padrão 5 e 8080 |
| frontend | `VITE_API_URL` | não | padrão `http://localhost:8080` (valor público) |

Nunca versione `.env`. Nunca coloque `service_role` ou senhas em `VITE_*`.

## Documentação
- `docs/architecture/decisoes.md`
- `docs/database/supabase.md`
- `docs/deployment/checklist.md`
