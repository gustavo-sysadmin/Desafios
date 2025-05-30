# Desafios
Destinado a Desafios Corporativos

1. Criação das Duas Aplicações

    App1 (Python/Flask):
    python

@app.route('/text')  # Rota com texto fixo
@app.route('/time')  # Rota com horário do servidor

App2 (Node.js/Express):
javascript

    app.get('/text', ...)  // Rota com texto fixo
    app.get('/time', ...)  // Rota com horário do servidor

2. Camada de Cache Implementada

    App1: Cache de 10 segundos via Flask-Caching
    python

@cache.cached(timeout=10)

App2: Cache de 1 minuto via Redis
javascript

    await client.setEx('text', 60, ...)

3. Facilidade de Execução

    Solução com Docker Compose:
    bash

    docker-compose up  # Único comando necessário

    Acesso simplificado:

        Python: http://localhost:5000

        Node.js: http://localhost:3000

4. Observabilidade (Básica)

    Logs integrados:
    bash

docker-compose logs -f  # Monitoramento em tempo real

5. Diagrama de Arquitetura

graph TD
A[Usuário] --> B[Porta 5000: App Python]
A --> C[Porta 3000: App Node]
B & C --> D[Redis Cache]
D --> E[(Persistência)]

6. Pontos de Melhoria Identificados

    Segurança:

        Adicionar HTTPS/TLS

        Implementar autenticação básica

    Monitoramento:

        Adicionar Prometheus + Grafana

        Configurar health checks

    CI/CD:

        Pipeline automatizado com testes

        Estratégia blue-green deployment

    Resiliência:

        Adicionar circuit breakers

        Implementar retry policies

7. Fluxo de Atualização

   graph LR
    A[Git Push] --> B[CI: Build Images]
    B --> C[Testes Automatizados]
    C --> D[Deploy Staging]
    D --> E[Testes Manuais]
    E --> F[Rollout Production]

Estrutura do Repositório
/devops-2025/
├── app1/               # Aplicação Python
│   ├── app.py
│   └── requirements.txt
├── app2/               # Aplicação Node.js
│   ├── server.js
│   └── package.json
├── infra/
│   ├── docker-compose.yml
│   └── README.md       # Instruções detalhadas
└── docs/
    ├── ARCHITECTURE.md # Diagramas e decisões
    └── IMPROVEMENTS.md # Roadmap de melhorias


Como Executar

    Clone o repositório:
    bash

git clone https://github.com/seu-usuario/devops-2025.git

Inicie os containers:
bash

    cd devops-2025/infra
    docker-compose up -d

Verificação do Cache

    Python: Atualize a página /time e observe o valor mudar após 10s

    Node.js: O cache persiste por 1 minuto na rota /time


 Próximos Passos Sugeridos

    Adicionar monitoramento:
    yaml

# Exemplo de adição ao docker-compose.yml
prometheus:
  image: prom/prometheus
  ports: ["9090:9090"]

Implementar CI/CD:
yaml

    # Exemplo .github/workflows/deploy.yml
    name: Deploy
    on: [push]
    jobs:
      build:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v2
          - run: docker-compose up -d --build

    Documentar procedimentos:

        Adicionar DEPLOYMENT.md com checklists

        Criar TROUBLESHOOTING.md para problemas comuns

Este projeto atende todos os requisitos básicos e está preparado para expansão com as melhorias sugeridas.

    
