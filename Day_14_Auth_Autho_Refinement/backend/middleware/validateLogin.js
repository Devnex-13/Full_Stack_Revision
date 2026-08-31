const validateLogin = (req,res,next) => {
  if(typeof(req.body.email) === "string" &&
    typeof(req.body.password) === "string"){
      if(req.body.email.trim() && req.body.password.trim()){
        next()
      }
      else{
        const error = new Error("Email or Password Is Empty!!")
        error.status = 400
        next(error)
      }
  }
  else{
    const error = new Error("Email or Password Is Not String!!")
    error.status = 400
    next(error)
  }
}

module.exports = validateLogin