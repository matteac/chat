const path = require("path")
const router = require("express").Router()
const User = require(path.join(__dirname, "../models/User.js"))

router.get("/chat", (req, res) => {
    if (req.session.user) {
        res.render("chat", { user: req.session.user.username })
    } else {
        res.redirect("/")
    }
})
router.get("/", (req, res) => {
    if (req.session.user) {
        res.redirect("/chat")
    } else {
        res.render("index", {title: "Home"})
    }
})

router.get("/signup", (req, res) => {
    if (req.session.user) {
        res.redirect("/chat")
    } else {
        res.render("signup", {title: "Sign Up", error: { message: ""}})
    }
})
router.post("/signup", (req, res) => { 
    const { username, password } = req.body
    User.findOne({ username }, (err, user) => { 
        if (err) {
            console.log(err)
        } else if (user) {
            res.render("signup", { title: "Sign Up", error: { message: "Username already exists" } })
        } else {
            User.create({
                username,
                //password should be hashed
                password
            })
            .then(user => {
                req.session.user = user
                res.redirect("/chat")
            })
            .catch(err => {
                console.log(err)
            })
        }
    })
})

router.get("/signin", (req, res) => {
    if (req.session.user) {
        res.redirect("/chat")
    } else {
        res.render("signin", {title: "Sign In", error: { message: ""}})
    }
})
router.post("/signin", (req, res) => {
    const { username, password } = req.body
    User.findOne({
        username,
        password
    })
    .then(user => {
        if (user) {
            req.session.user = user
            res.redirect("/chat")
        } else {
            res.render("signin", { title: "Sign In", error: { message: "Invalid username or password" } })
        }
    })
    .catch(err => {
        console.log(err)
        res.redirect("/signin")
    })
})








module.exports = router
