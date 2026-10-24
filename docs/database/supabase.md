# Supabase

## Conexão (documentação do Supabase, consultada em 24/10/2026)
| Modo | Host | Porta | Usuário | IP |
|---|---|---|---|---|
| Direta | `db.<ref>.supabase.co` | 5432 | `postgres` | IPv6 (IPv4 só com add-on) |
| Session pooler | `aws-<n>-<região>.pooler.supabase.com` | 5432 | `postgres.<ref>` | IPv4 |
| Transaction pooler | idem | 6543 | `postgres.<ref>` | IPv4 |

Para backend persistente: conexão direta ou Session pooler. O Transaction pooler não suporta prepared statements nem estado de sessão. Copie o host exato no diálogo **Connect**.

## Pool
Hikari com 5 conexões por padrão (`DB_POOL_MAX_SIZE`). Confirme os limites atuais do plano Free no painel.

## RLS
O schema `public` é exposto pela Data API do Supabase. Toda migration deve ativar RLS nas tabelas, sem policies; o backend usa o usuário do banco e não é afetado. Ative RLS manualmente também em `flyway_schema_history`.

## Limitações
O plano Free não garante disponibilidade contínua (projetos inativos podem ser pausados).
