const dotenv = require("dotenv")
const path = require("path")

dotenv.config({path:path.resolve(__dirname,'../.env')})

const jwt = require("jsonwebtoken")
const loginUser = require("../data/loginUser") 

const login = (req, res) => {
    if(req.body.email === loginUser.email && req.body.password === loginUser.password){
      const secretKey = process.env.JWT_SECRET_KEY
      const token = jwt.sign({
        email:loginUser.email,
        role:loginUser.role
      }, 
      secretKey,{
        expiresIn:"1h"
      })
      return res.status(200).json({
        success:true,
        message:"✅Login Successfully!!",
        token:token
      })
    }
    else{
      res.status(401).json({
        success:false,
        message:"❌ Invalid Email or Password!"
      })
    }
  }


module.exports = login
