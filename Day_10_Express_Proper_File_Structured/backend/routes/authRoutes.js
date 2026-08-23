const express = require("express")

const router = express.Router()

const validateLogin = require("../middleware/validateLogin")

const login = require("../controller/authController")

router.post("/",validateLogin,login)

module.exports = router