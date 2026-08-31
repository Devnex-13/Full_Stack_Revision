const express = require("express")

const authMiddleware = require("../middleware/authMiddleware")

const roleMiddleware = require("../middleware/roleMiddleware")

const router = express.Router()

const validateLogin = require("../middleware/validateLogin")

const login = require("../controller/authController")

router.post("/login",login)

router.post("/",validateLogin,login)

router.get("/profile", authMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Protected Route Accessed",
    user: req.user
  })
})

router.get("/admin",authMiddleware,roleMiddleware("admin"),(req, res) => {
    res.status(200).json({
      success: true,
      message: "Welcome Admin! 👑",
      user: req.user
    })
  }
)

module.exports = router