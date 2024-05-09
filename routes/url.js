const express = require("express");

const {
    showIndexHtmlPage,
    postLongUrl,
    getRedirectedUrl,
} = require("../controllers/url");

const router = express.Router();

router.get("/", showIndexHtmlPage);

router.post("/longurl", postLongUrl);

router.get("/:urlId", getRedirectedUrl);

module.exports = router;
