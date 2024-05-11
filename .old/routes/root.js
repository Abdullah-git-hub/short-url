const express = require("express");
const { showIndexHtmlPage, getRedirectedUrl } = require("../controllers/root");

const router = express.Router();

router.get("/", showIndexHtmlPage).get("/:urlId", getRedirectedUrl);

module.exports = router;
