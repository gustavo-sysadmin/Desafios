
Aplicações
App1 (Node.js)

app1/index.js:

    const express = require('express');
    const app = express();

    // Rota com texto fixo
    app.get('/texto', (req, res) => {
        res.send('Texto fixo da aplicação Node.js');        
    });

    // Rota com horário atual
    app.get('/hora', (req, res) => {
        res.send(new Date().toString());
    });

    app.listen(3000, () => {
        console.log('App Node.js rodando na porta 3000');
    });


app1/package.json:

    {
      "name": "app1",
      "version": "1.0.0",
      "main": "index.js",
      "scripts": {
        "start": "node index.js"
      },
      "dependencies": {
        "express": "^4.18.2"
      }
    }


app1/Dockerfile:

    FROM node:18-alpine
    WORKDIR /app
    COPY package.json .
    RUN npm install
    COPY . .
    EXPOSE 3000
    CMD ["npm", "start"]

App2 (Python)
app2/app.py:

    from flask import Flask
    from datetime import datetime

    app = Flask(__name__)

    @app.route('/texto')
    def texto_fixo():
        return "Texto fixo da aplicação Python"

    @app.route('/hora')
    def hora_atual():
        return str(datetime.now())

    if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

app2/requirements.txt:
    
    flask==2.3.2

app2/Dockerfile:

    FROM python:3.9-slim
    WORKDIR /app
    COPY requirements.txt .
    RUN pip install -r requirements.txt
    COPY . .
    EXPOSE 5000
    CMD ["python", "app.py"]

Configuração de Cache com Nginx

    nginx/nginx.conf:
    worker_processes 1;

    events { worker_connections 1024; }

    http {
        proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=node_cache:10m inactive=10s;
        proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=python_cache:10m inactive=60s;

    server {
        listen 80;

        # App1 (Node.js) - Cache de 10 segundos
        location /app1/texto {
            proxy_pass http://app1:3000/texto;
            proxy_cache node_cache;
            proxy_cache_valid 200 10s;
            add_header X-Proxy-Cache $upstream_cache_status;
        }

        location /app1/hora {
            proxy_pass http://app1:3000/hora;
            proxy_cache node_cache;
            proxy_cache_valid 200 10s;
            add_header X-Proxy-Cache $upstream_cache_status;
        }

        # App2 (Python) - Cache de 1 minuto
        location /app2/texto {
            proxy_pass http://app2:5000/texto;
            proxy_cache python_cache;
            proxy_cache_valid 200 60s;
            add_header X-Proxy-Cache $upstream_cache_status;
        }

        location /app2/hora {
            proxy_pass http://app2:5000/hora;
            proxy_cache python_cache;
            proxy_cache_valid 200 60s;
            add_header X-Proxy-Cache $upstream_cache_status;
        }
    }
}


nginx/Dockerfile:

    FROM nginx:alpine
    COPY nginx.conf /etc/nginx/nginx.conf

Docker Compose

docker-compose.yml:
    
    version: '3.8'

    services:
      app1:
    build: ./app1
    ports:
      - "3000:3000"
    restart: unless-stopped

      app2:
    build: ./app2
    ports:
      - "5000:5000"
    restart: unless-stopped

      nginx:
    build: ./nginx
    ports:
      - "8080:80"
    depends_on:
      - app1
      - app2
    restart: unless-stopped
    
 
 Observabilidade (Básica)

Vamos adicionar logs básicos e health checks:

Atualize o docker-compose.yml:

    services:
      app1:
    # ... configuração existente ...
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/texto"]
      interval: 30s
      timeout: 10s
      retries: 3

      app2:
    # ... configuração existente ...
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:5000/texto"]
      interval: 30s
      timeout: 10s
      retries: 3
 
 Execução

    Clone o repositório

    Execute:

bash

docker-compose up --build -d

Acesse:

    Node.js app: http://localhost:8080/app1/texto ou /app1/hora

    Python app: http://localhost:8080/app2/texto ou /app2/hora

 Diagrama de Arquitetura

    ┌─────────────────────────────────────────────────────┐
    │                    Requisição HTTP                  │
    └──────────────────────────┬─────────────────────────┘
                           │
    ┌──────────────────────────▼─────────────────────────┐
    │                     Nginx (Cache)                  │
    │ ┌─────────────────┐      ┌─────────────────┐      │
    │ │ Cache Node.js   │      │ Cache Python    │      │
    │ │ (10 segundos)   │      │ (60 segundos)   │      │
    │ └────────┬────────┘      └────────┬────────┘      │
    └──────────┼────────────────────────┼───────────────┘
           │                        │
    ┌──────────▼────────┐    ┌─────────▼────────┐
    │ App1 (Node.js)    │    │ App2 (Python)    │
    │ Porta 3000        │    │ Porta 5000       │
    └───────────────────┘    └──────────────────┘

Fluxo de Atualização

    Atualizar código da aplicação

    Reconstruir imagem Docker (docker-compose build)

    Recriar container (docker-compose up -d --no-deps <service>)

 Pontos de Melhoria

    Observabilidade: Adicionar Prometheus e Grafana para métricas detalhadas

    Logs: Implementar ELK Stack para gerenciamento centralizado de logs

    CI/CD: Adicionar pipeline com GitHub Actions ou GitLab CI

    Orquestração: Migrar para Kubernetes em ambiente de produção

    Cache distribuído: Implementar Redis ou Varnish para cache mais eficiente

    Monitoramento de saúde: Adicionar endpoints /health mais completos

    Autenticação: Adicionar autenticação nas APIs

    Rate limiting: Proteger contra abuso com limitação de requisições

Como Entregar

    Crie um repositório no GitHub/GitLab

    Adicione todos os arquivos acima

    Inclua um README.md com instruções de execução

    Envie o link do repositório

Esta solução pode ser executada com apenas 2 comandos:
bash

git clone <repositorio>
docker-compose up --build -d

E oferece todos os requisitos solicitados de forma simples e eficiente.
