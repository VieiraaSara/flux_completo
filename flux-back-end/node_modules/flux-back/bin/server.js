const http = require('http');
const debug = require('debug')('nodestr:server');
const express = require('express');
const app = require('../src/app');

// Normaliza a porta
const PORT = normalizePort(process.env.PORT || 10000);
app.set('port', PORT);

// Cria o servidor HTTP
const server = http.createServer(app);

// Rota inicial
app.get('/', (req, res) => {
  res.status(200).send({
    title: "Flux API",
    version: "0.0.1"
  });
});

// Outra rota exemplo
app.get('/hello-world', (req, res) => {
  res.send('Hello world');
});

// Inicia o servidor
server.listen(PORT, () => {
  console.log('Server rodando na porta ' + PORT);
});

// TRATAMENTO DE ERROS DO SERVIDOR
server.on('error', onError);
server.on('listening', onListening);

// Função para normalizar a porta
function normalizePort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val; // Porta não numérica, como pipes ou strings
  }
  if (port >= 0) {
    return port; // Porta numérica válida
  }
  return false;
}

// Função para lidar com erros
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof PORT === 'string' ? 'Pipe ' + PORT : 'Port ' + PORT;
  
  // Verifica tipos de erro
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

// Função para quando o servidor começa a escutar
function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
