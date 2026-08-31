const dotenv = require("dotenv")
const path = require("path")
const db = require("../config/db")
const bcrypt = require("bcrypt") 

dotenv.config({path:path.resolve(__dirname,'../.env')})

const jwt = require("jsonwebtoken")

const login = async (req,res,next) => {
  const {email, password} = req.body
  try{
    const [users] = await db.query("SELECT * FROM users WHERE email = ?",[email])

    if(users.length === 0){
      const error = new Error("Invalid email or Password")
      error.status = 401
      return next(err)
    }

    const user = users[0]

    const isPasswordValid = await bcrypt.compare(
      password, user.password
    )

    if(!isPasswordValid){
      const error = new Error("Invalid email or Password")
      error.status = 401
      return next(error)
    }

    const secretKey = process.env.JWT_SECRET_KEY
      const token = jwt.sign({
        id: user.id,
        email:user.email,
        role:user.role
      }, 
      secretKey,
      {
        expiresIn:"1h"
      })

      return res.status(200).json({
        success:true,
        message:"✅Login Successfully!!",
        data:{
          token,
          user:{
            id:user.id,
            name:user.name,
            email:user.email,
            role:user.role
          }
        }
      })
  }
  catch (err){
    next(err)
  }
}


module.exports = login