// server.js

const express = require('express');
const bcrypt = require('bcrypt');
const session = require('express-session');
const MongoStore = require("connect-mongo");
const mongoose=require('mongoose');
const User=require('models/database')
const app = express();
const port = 3000;

app.use(express.urlencoded({extended:true}));

//session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));

//middleware
app.use((req,res,next)=>{
  console.log(`[Middleware] ${req.method} ${req.url}`);
    next();
})

app.get('/',(req,res)=>{
    res.send("hey its a handler");
})
app.post('/signup',async (req,res)=>{
  const{username,password,email}=req.body;
  //lets take our database model name is user and we are just giving a sample demo of  signup 
  try{
  const hashedPassword=await bcrypt.hash(password,10);
    await User.create({username,email,password:hashedPassword});
  res.redirect('/');
  }
  catch(err){
    res.send(err.message);
  }

})

app.get('/login',(req,res)=>{
    res.render('login'); // suppose we have already login page and other things ready
})

app.post('/login', async (req,res)=>{
    const{email,password}=req.body;
    //lets take our database model name is User and we are just giving a sample demo of login
    try{
    const user=await User.findOne({email});
    if(!user){
        res.send("email is incorrect");
    }
    const isvalidpassword=await bcrypt.compare(password,user.password);
    if (!isvalidpassword) {
        res.send("wrong password");
    }
    req.session.user=user;
    res.redirect('/');
    }
    catch(err){
        res.send(err.message +"something is wrong");
    }
})
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
