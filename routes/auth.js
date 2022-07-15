const router = require("express").Router()
const authController = require("../controller/authController")

router.post("/auth/login", authController.postLogin)
router.post("/auth/check", authController.checkLogin)

module.exports = router