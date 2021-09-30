const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    socket.broadcast.emit(msg);
    io.emit('chat message', msg);
    console.log('message: ' + msg.text);
  });
});


// io.on('connection', (socket) => {
  // socket.broadcast.emit('hi');
// });

server.listen(3015, () => {
  console.log('listening on *:3015');
});