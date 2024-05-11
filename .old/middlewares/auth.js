const { getUser } = require("../services/auth");

function restrictLoggedinUserOnly(req, res, next) {
    // console.log(req);
    const uid = req.cookies?.uid;

    if (uid == undefined || uid == null) {
        console.log("UID Not found");
        return res.json("/user/login");
        // return res.status(404).json({ path: "/user/login" });
    }

    console.log(uid);

    const user = getUser(uid);

    console.log("From middleware", user);
    // console.log("UID Not found");
    if (user == undefined || user == null) {
        // return res.status(404).json({ path: "/user/login" });
        return res.redirect("/user/login");
    }

    req.user = user;
    next();
}

function checkAuth(req, res, next) {
    // console.log(req);
    const uid = req.cookies?.uid;

    console.log(uid);

    const user = getUser(uid) || null;

    console.log("From middleware", user);

    req.user = user;
    next();
}

module.exports = {
    restrictLoggedinUserOnly,
    checkAuth,
};
