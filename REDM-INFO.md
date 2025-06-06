Funcionamento em 3 passos:

    Duas Aplicações:

        App 1: Node.js (retorna texto fixo e hora atual)

        App 2: Python (retorna texto fixo e hora atual)

    Cache Automático:

        Respostas do Node.js ficam em cache por 10 segundos

        Respostas do Python ficam em cache por 1 minuto

    Como Testar:
    bash

    docker-compose up --build -d

    Acesse:

        http://localhost:8080/app1/texto (Node.js - cache 10s)

        http://localhost:8080/app2/hora (Python - cache 60s)

O que acontece nos bastidores:

    Nginx atua como cache na frente das aplicações

    Quando você acessa, ele mostra a resposta salva (se estiver no cache) ou busca nova das aplicações

    Os headers de resposta mostram se foi cache hit (X-Proxy-Cache: HIT) ou miss

Extras incluídos:

    Monitoramento básico (health check dos containers)

    Tudo pré-configurado para rodar imediatamente

    Diagrama simples da arquitetura

É como ter dois mini-sites com "memória temporária" (cache), onde um esquece depois de 10 segundos e o outro depois de 1 minuto,
