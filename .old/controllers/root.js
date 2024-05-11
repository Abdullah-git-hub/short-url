const { ShortUrl } = require("../models/url");

function showIndexHtmlPage(req, res) {
    // if (!user) return res.redirect("/user/login");
    // console.log(req.cookies.uid);
    res.render("index", {
        userId: "663d010e63b63795da967548",
        title: "URL | Araweb",
        cssPath: "../public/style.css",
        jsPath: "../public/main.js",
    });
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
    getRedirectedUrl,
};
