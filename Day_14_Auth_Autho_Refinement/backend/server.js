// External Module
const express = require("express")

// Local Module
const authRoutes = require('./routes/authRoutes')

const userRoutes  = require('./routes/userRoutes')

const cors = require("cors")

const app = express()

const logger = require("./middleware/logger")

const errorHandler = require("./middleware/errorHandler")

const db = require("./config/db")

db.query("SELECT 1")
.then(() => {
  console.log("✅ DATABASE Connected Successfully!!")
})
.catch((err) => {
  console.log("❌DATABASE Connection Fails!!")
  console.log(err)
})

app.use(cors());

app.use(express.json()) // To Enabled JSON Body Parsing

app.use(logger)

app.use('/api/auth',authRoutes);

app.use('/api/users',userRoutes);

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

app.get("/api/error", (req, res, next) => {
  const error = new Error("This is a test error!");
  next(error);
});
  
app.use(errorHandler)

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Successfully Running On Server http://localhost:${PORT}`)
})