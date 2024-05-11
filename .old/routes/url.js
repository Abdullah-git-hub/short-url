const express = require("express");
const { postLongUrl, showShortUrl } = require("../controllers/url");

const router = express.Router();

router.get("/:id", showShortUrl);
router.post("/longurl", postLongUrl);

module.exports = router;
