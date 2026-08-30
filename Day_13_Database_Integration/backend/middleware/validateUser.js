const validateUser = (req,res,next) => {
  if(typeof(req.body.name) === "string" &&
  typeof(req.body.role) === "string"){
    if(req.body.name.trim() && req.body.role.trim()){
      next()
    }
    else{
      const error = new Error("Name or Role Is Empty!!")
      error.status = 400
      console.log("Name or Role Is Empty!!")
      next(error)
    }
  }
  else{
    const error = new Error("Name or Role Is Not String!!")
    console.log("Name or Role Is Not String!!")
    error.status = 400
    next(error)
  }
}

module.exports = validateUser