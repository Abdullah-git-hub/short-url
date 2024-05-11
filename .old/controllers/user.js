const { v4: uuidv4 } = require("uuid");
const User = require("../models/user");
const { setUser } = require("../services/auth");

function getCreatUser(req, res) {
    res.render("signup", {
        title: "User | URL Shorner",
        cssPath: "../../public/style.css",
        jsPath: "../../public/main.js",
    });
}

function createUser(req, res) {
    const { name, email, password } = req.body;
    const user = new User({
        name,
        email,
        password,
    });

    user.save()
        .then((result) => {
            res.redirect("/");
        })
        .catch((err) => {
            res.send(err);
        });
}

function getLogInUser(req, res) {
    res.render("login", {
        title: "Login | URL Shorner",
        cssPath: "../../public/style.css",
        jsPath: "../../public/main.js",
        log_in_error: "",
    });
}

function logInUser(req, res) {
    const { email, password } = req.body;
    User.findOne({
        email,
        password,
    })
        .then((user) => {
            if (user) {
                const sessionID = uuidv4();
                console.log(sessionID, user);
                setUser(sessionID, user);
                res.cookie("uid", sessionID);
                res.redirect("/");
            } else {
                res.render("login", {
                    title: "Login | URL Shorner",
                    cssPath: "../../public/style.css",
                    jsPath: "../../public/url.js",
                    log_in_error: `Incorrect email or password`,
                });
            }
        })
        .catch((err) => {
            res.render("login", {
                title: "Login | URL Shorner",
                cssPath: "../../public/style.css",
                jsPath: "../../public/url.js",
                log_in_error: `An error occured`,
            });
        });
}

module.exports = {
    createUser,
    getCreatUser,
    logInUser,
    getLogInUser,
};
