const express = require('express');
const router = express.Router();

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
    res.json(req.body);
});

//Post register data
router.post('/register', (req, res, next)=>{
    res.json(req.body);
})

module.exports = router;
