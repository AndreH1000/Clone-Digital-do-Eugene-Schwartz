-- Ativar extensão pgvector (só precisa rodar 1 vez no banco)
CREATE EXTENSION IF NOT EXISTS vector;

-- Criar tabela para armazenar documentos
CREATE TABLE documents (
  id BIGSERIAL PRIMARY KEY,
  content TEXT,       -- texto do documento
  metadata JSONB,     -- metadados associados
  embedding VECTOR(3072) -- 1536 dimensões (OpenAI ada-002)
);

-- Criar função de busca semântica
CREATE OR REPLACE FUNCTION match_documents (
  query_embedding VECTOR(3072),
  match_count INT DEFAULT 5,
  filter JSONB DEFAULT '{}'::jsonb
)
RETURNS TABLE (
  id BIGINT,
  content TEXT,
  metadata JSONB,
  similarity FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    d.id,
    d.content,
    d.metadata,
    1 - (d.embedding <=> query_embedding) AS similarity
  FROM documents d
  WHERE (filter = '{}' OR d.metadata @> filter)
  ORDER BY d.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
