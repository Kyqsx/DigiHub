-- Migration inicial (Etapa 1 - Fundação).
-- Cria apenas uma tabela de configurações da plataforma; as tabelas de domínio chegam nas etapas seguintes.

CREATE TABLE platform_setting (
    setting_key   VARCHAR(100) PRIMARY KEY,
    setting_value VARCHAR(500) NOT NULL,
    created_at    TIMESTAMPTZ  NOT NULL DEFAULT now(),
    updated_at    TIMESTAMPTZ  NOT NULL DEFAULT now()
);

INSERT INTO platform_setting (setting_key, setting_value)
VALUES ('schema.baseline', 'fundacao');

-- O Supabase expõe o schema "public" pela Data API (PostgREST). Com RLS ativo e sem policies,
-- nenhuma chave anon/authenticated consegue ler ou escrever. O backend acessa o banco com o
-- usuário do banco (que ignora RLS), então não é afetado.
ALTER TABLE platform_setting ENABLE ROW LEVEL SECURITY;
