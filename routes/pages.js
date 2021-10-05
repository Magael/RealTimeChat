const express = require('express');
const user = require('../core/user');
const router = express.Router();



//call index
router.get('/', (req, res, next) => {
    let user = req.session.user;
    if (user) {
        res.redirect('/');
        return;
    }
    res.render('index');
});

//Get chatpage
router.get('/', (req, res, next) => {
    let user = req.session.user;

    if (user) {
        res.render('/', { opp: req.session.opp, username: user.username });
        return;
    }
    res.redirect('index');
});

//Get chat page 
router.get('/chat',(req,res) => {

    res.render('chat.ejs',{username: 'steve'}) 
})

// Post login data
router.post('/login', (req, res, next) => {

    user.login(req.body.username, req.body.password, (result) => {
        if (result) {

            req.session.user = result;
            req.session.opp = 1;

            res.redirect('/chat');
        } else {
            res.send('Username/Password incorrect!');
        }
    });

});

//Post register data
router.post('/register', (req, res, next) => {
    let userInput = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
    };
    
    user.create(userInput, (lastId) => {
        if (lastId) {

            user.find(lastId.insertId, (result) => {
                req.session.user = result;
                req.session.opp = 0;
                res.redirect('/');
            });

        } else {
            console.log('Error creating a new user...');
        }
    });
});

// logout page
router.get('/logout',(req,res,next)=>{
    if(req.session.user){
        req.session.destroy(()=>{
            res.redirect('/');
        });
    }
});



module.exports = router;
