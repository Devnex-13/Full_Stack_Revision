const db = require("../config/db")

const bcrypt = require("bcrypt")

let {nextId, users} = require("../data/users")

const getUsers = async (req,res,next) => {
  console.log(req.query.name)
  console.log(req.query.role)
  console.log(Object.keys(req.query))
  if(Object.keys(req.query).length){
    if(req.query.name && req.query.role){
    const [result] = await db.query("SELECT * FROM users WHERE name LIKE ? AND role LIKE ?",[`%${req.query.name}%`,`%${req.query.role}%`]) 
    return res.status(200).json({
      success: true,
      message:"User fetch SuccessFully",
      data:result
    })
    }
    else if(req.query.role){
      const [result] = await db.query("SELECT * FROM users WHERE role LIKE ?",[`%${req.query.role}%`])
      return res.status(200).json({
      success: true,
      message:"User fetch SuccessFully",
      data:result
    })
    }
    else if(req.query.name){
      const [result] = await db.query("SELECT * FROM users WHERE name LIKE ?",[`%${req.query.name}%`])
      return res.status(200).json({
      success: true,
      message:"User fetch SuccessFully",
      data:result
    })
    }
    else{
      res.status(200).json({
      success: true,
      message: "No matching users found",
      data: []
    })
  }}
  else{
    try{
      const [users] = await db.query('SELECT * FROM users')
      res.status(200).json({
        success: true,
        message:"Users fetch SuccessFully",
        data:{
          users
        }
      })
    }
    catch(err){
      next(err)
    }
  }
}

const getUserById = async (req, res, next) => {
  const { id } = req.params
  try{
    const [result] = await db.query("SELECT * FROM users WHERE id = ?",[id]) 
    if (result.length){
      res.status(200).json({
        success: true,
        message:"User fetch SuccessFully",
        data:result
      })
    }
    else{
      res.status(404).json({
        success:false,
        message: "User Not Found!",
        data:null
      })
    }
  } catch (err) {
    next(err)
  }
}

const createUser = async (req,res,next) => {
    try{
      const {name, email, password, role} = req.body
      const hashedPassword = await bcrypt.hash(password,10)
      const [result] = await db.query(
        "INSERT INTO users (name, email, password, role) VALUES (?,?,?,?)",[name,email,hashedPassword,role]
      )
      res.status(201).json({
        success: true,
        message:"User Created SuccessFully",
        data:{
          id:result.insertId,
          name,
          email,
          role
        }
      })
    } catch(err) {
      next(err)
    } 
}

const updateUserById = async (req, res, next) => {
  const {id} = req.params
  const {name,email,role} = req.body
  const [result] = await db.query("SELECT * FROM users WHERE id=?",[id])
  
  if(result.length){
    try{
      const [up_result] = await db.query("UPDATE users SET name = ? , email=?, role=? WHERE id=?",[name,email,role,id])
      res.status(200).json({
        success: true,
        message:"User Updated Successfully!",
        data:up_result
    })}
    catch(err){
      next(err)
    }
    }
    
  else{
      res.status(404).json({
        success:false,
        message:"User Not Found",
        data:null
    })
  }
}

const updatePassword = async (req,res,next) => {
  try{
    console.log("Reg User",req.user)
    console.log("Id",req.user.id)
  const id = req.user.id
  const [users] = await db.query("SELECT * FROM users WHERE id = ?",[id])
  if (users.length === 0) {
    const error = new Error("User Not Found!")
    error.status = 404
    return next(error)
  }
  const user = users[0]
  const isPasswordValid = await bcrypt.compare(req.body.password, user.password)
  if(!isPasswordValid){
    const error = new Error("Old Password is not Matching!!")
    error.status = 401
    return next(error)
  }
    const hashedNewPass = await bcrypt.hash(req.body.newPassword,10)
    await db.query("UPDATE users SET password=? WHERE id=?",[hashedNewPass,id])
    res.status(200).json({
      success:true,
      message:"Password Updated Successfully!!",
    })
  }
  catch(err){
    next(err)
  }
}

const deleteUserById = async (req, res,next) => {
  const {id} = req.params
  const [result] = await db.query("SELECT * FROM users WHERE id=?",[id])
  if (result.length){
      try{
        await db.query("DELETE FROM users WHERE id = ?",[id])
        res.status(200).json({
          success: true,
          message:"User Deleted SuccessFully",
          data:null
        })
      }
      catch(err){
        next(err)
      }
  }
  else{
    res.status(404).json({
      success: false,
      message:"User Not Found",
      data:null
    })
  }
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  updatePassword,
  deleteUserById
}