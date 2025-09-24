flowchart TD

%% --- CORE WORKFLOW ---
subgraph Core["Core - Lead Analysis"]
    A[Webhook: Receive Lead] --> B[Set Lead]
    B --> C[Extract Sources (URLs)]
    C --> D[Prepare Embedding Body]
    D --> E[Embedding (OpenAI)]
    E --> F[Prepare Embedding Format]
    F --> G[Postgres Vector Search (Top-K Chunks do Livro)]
    G --> H[Prepare Vector Search]
    H --> I[AI Agent: Eugene Schwartz Brain]
    I --> J[OpenAI Chat Model]
    I --> K[Think Tool (Eugene Brain)]
    I --> L[Structured Output Parser]
    I --> M[Respond to Webhook]
end

%% --- DRIVE CREATE WORKFLOW ---
subgraph Create["Drive Monitoring - Arquivos Criados"]
    C1[Trigger: File Created in Drive] --> C2[Detect File Type]
    C2 --> C3[Long Over Text]
    C3 --> C4{Branch: Tipo de Arquivo?}

    %% PDF
    C4 -->|PDF| C5[Extract PDF Text]
    %% Textfiles
    C4 -->|TXT| C6[Extract Raw Text]
    %% Word
    C4 -->|DOCX| C7[Extract Text DOCX]
    %% Excel
    C4 -->|XLSX| C8[Extract Text Excel]
    %% Google Docs
    C4 -->|GDocs| C9[Convert GDocs to Text]

    %% Aggregation
    C5 --> C10[Aggregate Text]
    C6 --> C10
    C7 --> C10
    C8 --> C10
    C9 --> C10

    C10 --> C11[Embedding (OpenAI)]
    C11 --> C12[Insert into Supabase Vector Store]
end

%% --- DRIVE UPDATE WORKFLOW ---
subgraph Update["Drive Monitoring - Arquivos Atualizados"]
    U1[Trigger: File Updated in Drive] --> U2[Detect File Type]
    U2 --> U3[Long Over Text]
    U3 --> U4{Branch: Tipo de Arquivo?}

    %% PDF
    U4 -->|PDF| U5[Extract PDF Text]
    %% Textfiles
    U4 -->|TXT| U6[Extract Raw Text]
    %% Word
    U4 -->|DOCX| U7[Extract Text DOCX]
    %% Excel
    U4 -->|XLSX| U8[Extract Text Excel]
    %% Google Docs
    U4 -->|GDocs| U9[Convert GDocs to Text]

    %% Aggregation
    U5 --> U10[Aggregate Text]
    U6 --> U10
    U7 --> U10
    U8 --> U10
    U9 --> U10

    U10 --> U11[Embedding (OpenAI)]
    U11 --> U12[Update Supabase Vector Store]
end
