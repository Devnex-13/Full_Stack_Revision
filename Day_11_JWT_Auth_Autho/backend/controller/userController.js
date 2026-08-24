let {nextId, users} = require("../data/users")

const getUsers = (req,res) => {
  console.log(req.query.name)
  console.log(req.query.role)
  console.log(Object.keys(req.query))
  if(Object.keys(req.query).length){
    if(req.query.name && req.query.role){
    const user = users.filter((user) => (user.name.toLowerCase().includes(req.query.name.toLowerCase()) && user.role.toLowerCase().includes(req.query.role.toLowerCase())))
    return res.status(200).json({
      success: true,
      message:"User fetch SuccessFully",
      data:user
    })
    }
    else if(req.query.role){
      const user = users.filter((user) => user.role.toLowerCase().includes(req.query.role.toLowerCase()))
      return res.status(200).json({
      success: true,
      message:"User fetch SuccessFully",
      data:user
    })
    }
    else if(req.query.name){
      const user = users.filter((user) => user.name.toLowerCase().includes(req.query.name.toLowerCase()))
      return res.status(200).json({
      success: true,
      message:"User fetch SuccessFully",
      data:user
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
    res.status(200).json({
      success: true,
      message:"Users fetch SuccessFully",
      data:users
    })
  }
}

const getUserById = (req, res) => {
  const id = Number(req.params.id)
  console.log(id)
  const user = users.find((user)=>user.id === id);
  if (user){
    res.status(200).json({
      success: true,
      message:"User fetch SuccessFully",
      data:user
    })
  }
  else{
    res.status(404).json({
      success:false,
      message: "User Not Found!",
      data:null
    })
  }
}

const createUser = (req,res) => {
    console.log(req.body)
    const newObj = {"id":nextId, ...req.body}
    nextId++
    console.log(newObj)
    users.push(newObj)
    res.status(201).json({
      success: true,
      message:"User Created SuccessFully",
      data:newObj
    })
    console.log(users)  
}

const updateUserById = (req, res) => {
  const id = Number(req.params.id)
  const user = users.find((user ) => user.id === id)
  
  if(user){
    user.name = req.body.name
    user.role = req.body.role
    
    res.status(200).json({
      success: true,
      message:"User Updated Successfully!",
      data:user
  })}
  else{
      res.status(404).json({
        success:false,
        message:"User Not Found",
        data:null
    })
  }
}

const deleteUserById = (req, res) => {
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
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById
}