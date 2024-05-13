const { v4: uuidv4 } = require("uuid");
const User = require("../models/user");
const { setUser } = require("../services/auth");

async function handleUserSignUp(req, res) {
    const { name, email, password } = req.body;
    await User.create({ name, email, password });

    return res.redirect("/");
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });

    if (!user) return res.redirect("/login");

    const token = setUser(user);

    console.log("from user/login", user);
    res.cookie("token", token);
    return res.redirect("/");
}

module.exports = {
    handleUserSignUp,
    handleUserLogin,
};
