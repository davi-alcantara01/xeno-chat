const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const authRouter = require('./src/routes/authRoutes');
const chatSocket = require('./src/socket/chatSocket');
const app = express();
const server = http.createServer(app);
const cors = require('cors');
const PORT = 3000;

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST']
  }
});

chatSocket(io);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use('/', authRouter);

server.listen(PORT, () => {
  console.log('Servidor rodando na porta: ' + PORT);
});