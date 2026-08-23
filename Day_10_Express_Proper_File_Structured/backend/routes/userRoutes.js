const express = require("express")

const router = express.Router()

const validateUser = require("../middleware/validateUser")

const { getUsers, getUserById, createUser, updateUserById, deleteUserById } = require("../controller/userController")

router.get('/:id',getUserById)

router.get('/',getUsers)

router.post('/',validateUser,createUser)

router.put('/:id',validateUser,updateUserById)

router.delete('/:id',deleteUserById)

module.exports = router;