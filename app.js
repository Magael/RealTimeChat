const express = require('express');
const session = require('express-session');
const path = require('path');
const pageRouter = require('./routes/pages');
const app = express();
const PORT = 5050 || process.env.PORT;
/*const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);*/ 
const http = require('http').Server(app);
const io = require('socket.io')(http);
const passport = require('passport');

//const initializePassport = require('./public/passport-config');
//initializePassport(passport)



// used by body-parser
app.use(express.urlencoded({extended : false}));


//static files
app.use(express.static(path.join(__dirname, 'public')));


//templates
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//session
app.use(session({
    secret:'RealTimeChat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60*1000*30
    }
}));

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
});



//setting server

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      socket.broadcast.emit(msg);
      io.emit('chat message', msg);
      console.log('message: ' + msg.text);
    });
  });

  /*io.on('connection',function(socket){
    console.log('a user is connected');
    socket.on('disconnect',function(){
        console.log('a user is disconnected')
    })
    socket.on('chat message',function(msg){
        console.log('message reçu : ' + msg);
        io.emit('chat message',msg);
    })
});*/

http.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});



module.exports = app;


