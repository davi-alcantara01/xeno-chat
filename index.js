const express = require('express');
const http = require('http');
const authRouter = require('./src/routes/authRoutes');
const app = express();
const server = http.createServer(app);
const PORT = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', authRouter);

server.listen(PORT, () => {
  console.log('Servidor rodando na porta: ' + PORT);
});