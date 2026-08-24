const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const path = require("path")

dotenv.config({path: path.resolve(__dirname,'../.env')})

const authMiddleware = (req, res, next) =>{
  const secretKey = process.env.JWT_SECRET_KEY
  if(req.headers.authorization){
  const header = req.headers.authorization.split(" ")
  console.log(header)
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
      message:"Access Token Required!!⚠️"
    })
  }

}

module.exports = authMiddleware