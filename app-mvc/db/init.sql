CREATE TABLE IF NOT EXISTS notas (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  conteudo TEXT,
  favorita BOOLEAN NOT NULL DEFAULT FALSE,
  criado_em TIMESTAMP DEFAULT NOW()
);

-- Para bancos criados antes da coluna "favorita" existir
ALTER TABLE notas ADD COLUMN IF NOT EXISTS favorita BOOLEAN NOT NULL DEFAULT FALSE;
