const express = require("express");
const {
    showIndexHtmlPage,
    postLongUrl,
    getRedirectedUrl,
} = require("../controllers/url");

const router = express.Router();

router
    .get("/", showIndexHtmlPage)
    .post("/longurl", postLongUrl)
    .get("/:urlId", getRedirectedUrl);

module.exports = router;
