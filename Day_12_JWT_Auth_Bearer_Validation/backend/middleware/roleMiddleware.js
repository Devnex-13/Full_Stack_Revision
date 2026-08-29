const roleMiddleware = (role) => {
  return (req,res,next) => {
    if(req.user.role === role){
      next()
    }
    else{
      res.status(403).json({
        success: false,
        message:"You Are Not Allowed!⚠️ Access Forbidden!"
      })
    }
  }
}

module.exports = roleMiddleware