// External Module
const express = require("express")

const cors = require("cors")

const app = express()

app.use(cors());

app.get('/api/hello',(req,res,next) => {
  res.json({ "message": "Hello from my first backend!"})
})

app.get('/api/about',(req,res,next) => {
  console.log("Inside /api/about",req.url, req.method)
  res.json({
  "name": "Devanshu",
  "role": "Full Stack Developer",
  "status": "Learning"
  })
})

app.get('/api/users',(req, res,next) => {
  res.json([
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
])
})

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Successfully Running On Server http://localhost:${PORT}`)
})