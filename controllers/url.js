const { ShortUrl } = require("../models/url");
const { makeid } = require("../services/id");

function showIndexHtmlPage(req, res) {
    // res.sendFile("./views/index.html", { root: __dirname });
    // ShortUrl.find().then((docs) => console.log(docs));
    res.render("index", {
        title: "URL | Araweb",
        cssPath: "../public/style.css",
        jsPath: "../public/main.js",
    });
}

function postLongUrl(req, res) {
    const longUrl = req.query.url;
    const urlHash = makeid(8);
    const urlDoc = {
        url: longUrl,
        urlHash,
    };

    const shortUrl = new ShortUrl(urlDoc);

    shortUrl
        .save()
        .then((result) => res.send(result))
        .catch((err) => res.send(err));

    // db.collection("url")
    //     .insertOne(urlDoc)
    //     .then((result) => {
    //         // console.log(result);
    //         res.json(urlDoc);
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });
}

function getRedirectedUrl(req, res) {
    const urlId = req.params.urlId;
    ShortUrl.findOne({ urlHash: urlId })
        .then((doc) => {
            console.log(doc);
            res.render("redirect", { url: doc.url });
        })
        .catch((err) => {
            console.log(err);
            res.redirect("/");
            // res.status(404).send("Page Not Found");
        });
}

module.exports = {
    showIndexHtmlPage,
    postLongUrl,
    getRedirectedUrl,
};
