const express = require("express");
const {
    getCreatUser,
    createUser,
    logInUser,
    getLogInUser,
    postLongUrl,
} = require("../controllers/user");

const router = express.Router();

router.get("/", (req, res) => {
    res.redirect("/");
});
router.get("/create", getCreatUser);
router.post("/create", createUser);
router.get("/login", getLogInUser);
router.post("/login", logInUser);
// router.post("/longurl", restrictLoggedinUserOnly, postLongUrl);

module.exports = router;
