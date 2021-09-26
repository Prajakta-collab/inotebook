const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");



const JWT_SECRET = "pr@j_l@ves_$u$h";

// Route 1: Create a User using :Post (/api/auth/createuser)  no login required
router.post(
  "/createuser",
  [
    body("email", "Enter a validemail ").isEmail(),
    body("name", "Enter valid name").isLength({ min: 2 }),
    body("password", "Password must be of atleast 5 characters ").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      //if there are error in this array , then return Bad request and errors
      //findOne chya parameter mmdhe req.body.email mnje jr hya req wala email already exist krtoy tr bad request show kra
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry this user is alreay exist !" });
      }

      //bcrypt js is package which help us in the hash, salt , pepper thing
      // genSalt method ne salt generate hot
      //hash method ne hash genrate hoil
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      const data = {
        id: user.id,
      };
      //data mdhe id hya sathi vaprliy bcoz id vr index ahe apli so it will be easy and fast to retrive
      //jwt sign method use to sign the secret
      //JWT_SECRET is our 256 bit secret
      const authToken = jwt.sign(data, JWT_SECRET);
      //res.json(user)

      //authToken return kru apn user la
      res.json(authToken);

      // .then(user => res.json(user))
      // .catch(err=>console.log(err))}
    } catch (error) {
      console.error(error.message);
      res.status(500).send("");
    }
  }
);

//Router 2: Authenticate a User using :Post (/api/auth/login)  no login required
router.post(
  "/login",
  [
    body("email", "Enter a validemail ").isEmail(),
    
    body("password", "Password can not be blank ").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const{email,password}=req.body;
    try {
      let user=await User.findOne({email});
      if(!user){
        return res.status(400).send("Please login with correct credentials");
      }

      let passwordCompare=await bcrypt.compare(password,user.password);
      if(!passwordCompare){
        return res.status(400).send("Please login with correct credentials");
      }
      const data = {
        id: user.id,
      };
      //data mdhe id hya sathi vaprliy bcoz id vr index ahe apli so it will be easy and fast to retrive
      //jwt sign method use to sign the secret
      //JWT_SECRET is our 256 bit secret
      const authToken = jwt.sign(data, JWT_SECRET);
      //res.json(user)

      //authToken return kru apn user la
      res.json(authToken);

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error !");
    }

  }
);

//Router 3: Get logedin User Details using :Post (/api/auth/getuser)  Login required
router.post(
  "/getuser",fetchuser,async (req, res) => {
      
  try {
    console.log(req.user)
    let userId= req.user.id;
    const user=await User.findById(userId).select("-password");
    res.send(user);

    
  } catch (error) {
    console.error(error.message);
      res.status(500).send({error:"Internal Server Error !"});
  }
  });


module.exports = router;
