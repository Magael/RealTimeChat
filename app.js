const express = require('express');
const path = require('path');
const pageRouter = require('./routes/pages');
const app = express();
const http = require('http');
const server = http.createServer(express);
const { Server } = require("socket.io");
const io = new Server(server);

// used by body-parser
app.use(express.urlencoded({extended : false}));


//static files
app.use(express.static(path.join(__dirname, 'public')));


//templates
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//this code to router
app.get('/chat', (req, res) => {
    res.sendFile(__dirname + '/chat.html');
  });


//this is disable. code from above should be aded to router
//routers
app.use('/', pageRouter);

//errors: 404
app.use((req, res, next)=>{
    let err = new Error ('Page not found');
    err.status = 404;
    next(err);
});

// handling errors
app.use((err,req, res, next)=>{
    res.status(err.status || 500);
    res.send(err.message);
})

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      socket.broadcast.emit(msg);
      io.emit('chat message', msg);
      console.log('message: ' + msg.text);
    });
  });

//setting server
app.listen(5050, ()=>{
    console.log('Server running on port 5050');
});

module.exports = app;