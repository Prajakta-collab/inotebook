const express=require('express');
const User=require('../models/User')
const router=express.Router();
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');




//create a User using :Post (/api/auth/createuser)  no login required
router.post('/createuser',[
    body('email','Enter a valid email ').isEmail(),
    body('name','Enter valid name').isLength({min:2}),
    body('password','Password must be of atleast 5 characters ').isLength({ min: 5 }),
    
],async(req,res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //if there are error in this array , then return Bad request and errors
  //findOne chya parameter mmdhe req.body.email mnje jr hya req wala email already exist krtoy tr bad request show kra
    let user=await User.findOne({email:req.body.email});
    if(user){
      return res.status(400).json({error:"Sorry this user is alreay exist !"});
    }
    
    
    //bcrypt js is package which help us in the hash, salt , pepper thing
    // genSalt method ne salt generate hot 
    //hash method ne hash genrate hoil 
    const salt=await bcrypt.genSalt(10);
    const secPass=await bcrypt.hash(req.body.password,salt);
    user= await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      })
      res.json(user)
      
      // .then(user => res.json(user))
      // .catch(err=>console.log(err))
   
})

module.exports=router