// External Module
const express = require("express")

const cors = require("cors")

let nextId = 3

let users = [
  {
    "id": 1,
    "name": "Devanshu",
    "role": "Full Stack Developer"
  },
  {
    "id": 2,
    "name": "John",
    "role": "Frontend Developer"
  }
]

const app = express()


app.use(cors());

app.use(express.json()) // To Enabled JSON Body Parsing

app.use((req,res,next) => {
  console.log("Middleware Excetuted");
  next()
})

app.use((req,res,next) => {
  console.log(`[${new Date().toISOString()}]`,req.method,req.url);
  next()
})

app.use("/api/users",(req,res,next) => {
  console.log("User Middleware Executes!");
  next()
})

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

app.get('/api/hello',(req,res) => {
  res.json({ "message": "Hello from my first backend!"})
})

app.get('/api/about',(req,res) => {
  console.log("Inside /api/about",req.url, req.method)
  res.json({
    "name": "Devanshu",
    "role": "Full Stack Developer",
    "status": "Learning"
  })
})

app.get('/api/users/:id',(req,res) => {
  const id = Number(req.params.id)
  console.log(id)
  const user = users.find((user)=>user.id === id);
  if (user){
    res.status(200).json({
      success: true,
      message:"User fetch SuccessFully",
      data:[user]
    })
  }
  else{
    res.status(404).json({
      success:false,
      message: "User Not Found!",
      data:null
    })
  }
})

app.get('/api/users',(req, res) => {
  console.log(req.query.name)
  console.log(req.query.role)
  console.log(Object.keys(req.query))
  if(Object.keys(req.query).length){
    if(req.query.name && req.query.role){
    const user = users.filter((user) => (user.name.toLowerCase().includes(req.query.name.toLowerCase()) && user.role.toLowerCase().includes(req.query.role.toLowerCase())))
    res.status(200).json({
      success: true,
      message:"User fetch SuccessFully",
      data:[user]
    })
    }
    else if(req.query.role){
      const user = users.filter((user) => user.role.toLowerCase().includes(req.query.role.toLowerCase()))
      res.status(200).json({
      success: true,
      message:"User fetch SuccessFully",
      data:[user]
    })
    }
    else if(req.query.name){
      const user = users.filter((user) => user.name.toLowerCase().includes(req.query.name.toLowerCase()))
      res.status(200).json({
      success: true,
      message:"User fetch SuccessFully",
      data:[user]
    })
    }
    else{
      res.send([])
  }}
  else{
    res.status(200).json({
      success: true,
      message:"Users fetch SuccessFully",
      data:[users]
    })
  }
})

app.post('/api/users',validateUser,(req, res) => {
    console.log(req.body)
    const newObj = {"id":nextId, ...req.body}
    nextId++
    console.log(newObj)
    users.push(newObj)
    res.status(201).json({
      success: true,
      message:"User Created SuccessFully",
      data:[newObj]
    })
    console.log(users)  
    }
  )

app.delete('/api/users/:id',(req, res) => {
  const id = Number(req.params.id)
  const user = users.find((user) => user.id === id)
  if (user){
    users = users.filter((user) => user.id !== id)
    res.status(200).json({
      success: true,
      message:"User Deleted SuccessFully",
      data:null
    })
  }
  else{
    res.status(404).json({
      success: false,
      message:"User Not Found",
      data:null
    })
  }
})

app.put('/api/users/:id',validateUser,(req, res) => {
  const id = Number(req.params.id)
  const user = users.find((user ) => user.id === id)
  
  if(user){
    user.name = req.body.name
    user.role = req.body.role
    
    res.status(200).json({
      success: true,
      message:"User Updated Successfully!",
      data:[user]
  })}
  else{
      res.status(404).json({
        success:false,
        message:"User Not Found",
        data:null
    })
  }
  })

  app.get("/api/error", (req, res, next) => {
    const error = new Error("This is a test error!");
    next(error);
  });
  
  app.use((err,req,res,next) => {
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
  })

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Successfully Running On Server http://localhost:${PORT}`)
})