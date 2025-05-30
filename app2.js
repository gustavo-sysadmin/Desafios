const express = require('express');
const redis = require('redis');
const app = express();

// Configuração mais robusta do cliente Redis
const client = redis.createClient({
  socket: {
    host: 'redis',
    port: 6379
  }
});

// Conecta ao Redis
client.connect().catch(err => {
  console.error('Erro ao conectar no Redis:', err);
});

app.get('/', (req, res) => {
  res.send('App2 Node.js funcionando! Acesse /text ou /time');
});

app.get('/text', async (req, res) => {
  try {
    const cached = await client.get('text');
    if(cached) return res.json(JSON.parse(cached));
    
    const response = { message: "Texto fixo da App Node.js" };
    await client.setEx('text', 60, JSON.stringify(response));
    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro interno');
  }
});

app.get('/time', async (req, res) => {
  try {
    const cached = await client.get('time');
    if(cached) return res.json(JSON.parse(cached));
    
    const response = { current_time: new Date().toISOString() };
    await client.setEx('time', 60, JSON.stringify(response));
    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro interno');
  }
});

app.listen(3000, () => {
  console.log('Servidor Node.js rodando na porta 3000');
});