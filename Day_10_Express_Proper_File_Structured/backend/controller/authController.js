const loginUser = require("../data/loginUser") 

const login = (req, res) => {
    if(req.body.email === loginUser.email && req.body.password === loginUser.password){
      return res.status(200).json({
        success:true,
        message:"✅Login Successfully!!"
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