const { getUser } = require("../services/auth");

function checkForAuthentication(req, res, next) {
    // console.log(req);
    const authHeaderValue = req.cookies?.token;
    req.user = null;

    if (!authHeaderValue) return next();

    const user = getUser(authHeaderValue);

    console.log("form checkAUth", user);

    req.user = user;
    return next();
}

function restrictTo(roles) {
    return function (req, res, next) {
        if (!req.user) return res.redirect("/login");
        if (!roles.includes(req.user.role)) return res.send("UnAuthorized");
        return next();
    };
}

// async function restrictToLoggedInUserOnly(req, res, next) {
//     const userID = req.cookies.uid;

//     if (!userID) return res.redirect("/login");
//     // console.log(userID);

//     const user = getUser(userID);

//     if (!user) return res.redirect("/login");
//     // console.log(user);
//     req.user = user;
//     next();
// }

// async function checkAuth(req, res, next) {
//     const userID = req.cookies.uid;

//     // if (!userID) return res.redirect("/login");
//     // console.log(userID);

//     const user = getUser(userID);

//     // if (!user) return res.redirect("/login");
//     // console.log(user);
//     req.user = user;
//     next();
// }

module.exports = {
    checkForAuthentication,
    restrictTo,
};
