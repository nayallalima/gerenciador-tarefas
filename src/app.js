const express = require('express');
const app = express();
const tarefas = require('./routers/tarefas-routers');

app.use(express.json());
app.use('/', tarefas);

module.exports = app;