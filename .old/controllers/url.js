const { ObjectId } = require("mongodb");
const { ShortUrl } = require("../models/url");
const { makeid } = require("../services/id");

function postLongUrl(req, res) {
    const longUrl = req.query.url;
    const urlHash = makeid(8);
    const urlDoc = {
        url: longUrl,
        urlHash,
        createdBy: req.user._id,
    };

    const shortUrl = new ShortUrl(urlDoc);

    shortUrl
        .save()
        .then((result) => {
            console.log(result);
            res.json(result);
        })
        .catch((err) => {
            res.json(err);
        });
}

function showShortUrl(req, res) {
    const userId = req.params.id;

    shortUrl
        .find({ createdBy: ObjectId(userId) })
        .then((result) => {
            console.log(result);
            res.json(result);
        })
        .catch((err) => {
            res.json(err);
        });
}

module.exports = {
    postLongUrl,
    showShortUrl,
};
