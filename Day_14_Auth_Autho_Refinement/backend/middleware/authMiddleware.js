const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const path = require("path")

dotenv.config({path: path.resolve(__dirname,'../.env')})

const authMiddleware = (req, res, next) =>{
  const secretKey = process.env.JWT_SECRET_KEY
  const authorization = req.headers.authorization
  if(authorization){
    const header = authorization.split(" ")
    if(header[0] === "Bearer" && header[1]){
      const token = header[1]
      console.log(token)
      try{
      const decode = jwt.verify(token, secretKey)
      req.user = decode
      next()
      } catch (err) {
      console.log("Token Is Invalid!")
      res.status(401).json({
      success:false,
      message:"Invalid or Expired Token!!"
      })
      }
    } 
    else{
      res.status(401).json({
      success:false,
      message:"Invalid Authorization Header!!"
      })
    }
  }
  else{
    res.status(401).json({
      success:false,
      message:"Access Token Required!!⚠️"
    })
  }

}

module.exports = authMiddleware