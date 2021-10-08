const mongoose = require('mongoose');
const userSchema = require("./user");
const sha256 = require('js-sha256');
const jwt = require('jwt-then');

exports.register = async (req,res)=>{
    const {username,email,password} = req.body;

    //const emailRegex = /[@gmail.com|@yahoo.com|@hotmail.com|@live.com]$/;

    //if(emailRegex.test(email)) throw 'Email is not supported.';
    if(password.length < 6) throw 'Password must have minimum 6 characters.';

    const user = new userSchema({
        username,email,password: sha256(password + process.env.SALT),
    });
    
    req.session.user.username = req.body.username

    await user.save()

   .then (()=>{
       res.render("chat.ejs", {username: req.session.user.username});
   });
    
};

exports.login = async (req,res)=>{
    const { username } = req.body;
    
    let user = await userSchema.findOne({username}).then((data)=>{
        req.session.user = data
    });
    console.log(req.session)

    //if(!user) throw "Username and password did not match.";

    //const token = jwt.sign({id: user.id}, process.env.SECRET);

    
    res.redirect("/chat");
    token;
    
};
