const express = require("express")
const router = new express.Router()
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const registerController = require('../api/controllers/registerController')
const loginController = require('../api/controllers/loginController')

router.get("/", (req, res) => {
    res.render("login/login", {
        stacks: "Made with - Node, Express, Mongo"
    })
})
router.get("/signup", (req, res) => {
    res.render("signup/signup")
})
router.get("/dashboard", (req, res) => {
    res.render("dashboard/dashboard")
})
router.get("/account-created", (req, res) => {
    res.render("accontCreated/accountCreated")
})
router.get("*", (req, res) => {
    res.render("404/404")
})

router.post("/register", urlencodedParser, registerController)
router.post("/login", urlencodedParser, loginController)

module.exports = router