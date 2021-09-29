const express = require('express');
const User = require('../core/user');
const router = express.Router();

const user = new User();

//call index
router.get('/', (req,res,next)=>{
    res.render('index');
});

//Get homepage
router.get('/home',(req, res, next)=>{
res.send('You are at the Homepage!');
});

// Post login data
router.post('/login', (req, res, next)=>{
    user.login(req.body.username, req.body.password, (result)=>{
        if(result){
            res.send('Logged in as : '+ result.username);
        }else{
            res.send('Username/Password incorrect!');
        }
    })
});

//Post register data
router.post('/register', (req, res, next)=>{
    let userInput = {
        email : req.body.email,
        username : req.body.username,
        password : req.body.password,
        password_confirm : req.body.password_confirm
    };
    user.create(userInput, (lastId)=>{
        if(lastId){
            res.send('Welcome' + userInput.username);
        }else{
            console.log('Error creating new user...');
        }
    });
});

module.exports = router;
