const express = require("express");
const {
    getCreatUser,
    createUser,
    logInUser,
    getLogInUser,
} = require("../controllers/user");

const router = express.Router();

router.get("/", (req, res) => {
    res.send("akaka");
});
router.get("/create", getCreatUser);
router.post("/create", createUser);
router.get("/login", getLogInUser);
router.post("/login", logInUser);

module.exports = router;
