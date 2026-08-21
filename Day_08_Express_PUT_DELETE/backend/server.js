// External Module
const express = require("express")

const cors = require("cors")

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
    res.send(user)
  }
  else{
    res.status(404).json({
    message: "User Not Found!"
  })
  }
})

app.delete('/api/users/:id',(req, res) => {
  const id = Number(req.params.id)
  const user = users.find((user) => user.id === id)
  if (user){
    users = users.filter((user) => user.id !== id)
    res.json({
      message:"User Deleted"
    })
  }
  else{
    res.status(404).json({
      message: "User Not Found!"
    })
  }
})

app.put('/api/users/:id',(req, res) => {
  const id = Number(req.params.id)
  const user = users.find((user ) => user.id === id)

  if(user){
    user.name = req.body.name
    user.role = req.body.role

    res.json({
      message:"User Updated",
      user: user
    })}
  else{
    res.status(404).json({
      message:"User Not Found"
    })
  }
})

app.get('/api/users',(req, res) => {
  res.send(users)
})

app.post('/api/users',(req, res) => {
  console.log(req.body)
  const newObj = {"id":(users.length+1), ...req.body}
  console.log(newObj)
  res.status(201).json(newObj)
  users.push(newObj)
  console.log(users)
})

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Successfully Running On Server http://localhost:${PORT}`)
})