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

    await user.save()

   .then (()=>{
       res.redirect("/chat");
   });
    
};

exports.login = async (req,res)=>{
    const { email, password } = req.body;
    const user = await user.findOne({
        email,
        password: sha256(password + process.env.SALT),
    });

    if(!user) throw "Email and password did not match.";

    const token = jwt.sign({id: user.id}, process.env.SECRET);

    res.json({
        message: 'User logged in successfully!',
        token,
    });
};