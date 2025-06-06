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
