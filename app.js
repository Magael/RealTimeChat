const express = require('express');
const path = require('path');
const pageRouter = require('./routes/pages');
const app = express();

// used by body-parser
app.use(express.urlencoded({extended : false}));


//static files
app.use(express.static(path.join(__dirname, 'public')));


//templates
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

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


//setting server
app.listen(5050, ()=>{
    console.log('Server running on port 5050');
});

module.exports = app;