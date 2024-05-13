const shortid = require("shortid");
const URL = require("../models/url");

async function handlegenerateNewShortUrl(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ err: "url is required" });
    const shortID = shortid.generate();

    await URL.create({
        shortId: shortID,
        redirectUrl: req.body.url,
        visitHistory: [],
        createdBy: req.user._id,
    });

    // return res.json({ id: shortID });
    return res.render("home", { id: shortID });
}

async function handleAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result,
    });
}

module.exports = {
    handlegenerateNewShortUrl,
    handleAnalytics,
};
