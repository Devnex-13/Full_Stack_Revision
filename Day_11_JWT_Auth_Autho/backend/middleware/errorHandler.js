const errorHandler = (err,req,res,next) => {
    console.log(err)
    if(err.status){
      res.status(err.status).json({
        success:false,
        message:"Something Wents Wrong!!",
        data:null
      })
    }
    else{
      res.status(500).json({
        success:false,
        message:"Something Wents Wrong!!",
        data:null
    })
    }
  }

module.exports = errorHandler