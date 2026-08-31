const express = require("express")

const router = express.Router()

const validateUser = require("../middleware/validateUser")

const { getUsers, getUserById, createUser, updateUserById, updatePassword, deleteUserById } = require("../controller/userController")

const authMiddleware = require("../middleware/authMiddleware")

const roleMiddleware = require("../middleware/roleMiddleware")

router.get('/:id',authMiddleware,getUserById)

router.get('/',authMiddleware,getUsers)

router.post('/',validateUser,authMiddleware, roleMiddleware("admin"),createUser)

router.put('/change-password',authMiddleware,updatePassword)

router.put('/:id',validateUser,authMiddleware, roleMiddleware("admin"),updateUserById)

router.delete('/:id',authMiddleware, roleMiddleware("admin"),deleteUserById)

module.exports = router;