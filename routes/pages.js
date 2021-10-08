const express = require('express');
const passport = require('passport');
const user = require('../core/user');
const router = express.Router();
const userController = require('../core/userController');
const { catchErrors } = require('../errorHandlers/errorHandlers');


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
   res.render('chat.ejs',{username: req.session.user.username}) 
})

// Post login data
/*router.post('/login', (req, res, next) => {


    user.login(req.body.username, req.body.password, (result) => {
        if (result) {

            req.session.user = result;
            req.session.opp = 1;

            res.redirect('chat');
        } else {
            res.send('Username/Password incorrect!');
        }
    });

    res.render('chat.ejs',{username: req.session.user.username}) 
})*/

// Post login  and register data
router.post('/login', catchErrors(userController.login));
router.post('/register', catchErrors(userController.register));




// logout page
router.post('/logout',(req,res,next)=>{

    //if(req.session.user){
        //req.session.destroy(()=>{
 //           res.redirect('/');
        //});
    //}
});
     if(req.session.user){
        req.session.destroy(()=>{
            res.redirect('/');
        });
    }
 });




module.exports = router;
