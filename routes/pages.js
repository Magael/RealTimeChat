const express = require('express');
const user = require('../core/user');
const router = express.Router();
const userController = require('../core/userController');
const { catchErrors } = require('../handlers/errorHandlers');


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

// Post login  and register data
router.post('/login', catchErrors(userController.login));
router.post('/register', catchErrors(userController.register));



// logout page
router.post('/logout',(req,res,next)=>{
    // if(req.session.user){
        // req.session.destroy(()=>{
            res.redirect('/');
        // });
    // }
 });



module.exports = router;
