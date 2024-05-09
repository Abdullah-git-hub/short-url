const express = require("express");
// const { connectToDB, getDB } = require("./db");
const { ShortUrl } = require("../db");
const { makeid } = require("../id");
const mongoose = require("mongoose");

const app = express();

// connect mongoDB
const dbURI =
    "mongodb+srv://arafat:120338@node-prac.e5v4exj.mongodb.net/Node-Prac?retryWrites=true&w=majority&appName=node-prac";
// const dbURI = "mongodb://127.0.0.1:27017/short-Url";

// connectToDB(dbURI, (err) => {
//     if (!err) {
//         console.log("Connected to db");
//         db = getDB();
//         app.listen(3000, () => {
//             console.log("listening on port 3000...");
//         });
//     } else {
//         console.log(err);
//     }
// });
mongoose
    .connect(dbURI)
    .then(() => {
        console.log("MongoDB Connected");
        app.listen(3000, () => {
            console.log("listening on port 3000...");
        });
    })
    .catch((err) => console.log(err));

app.set("view engine", "ejs");
app.use("/public", express.static("./public"));
app.use(express.json());

app.get("/", (req, res) => {
    // res.sendFile("./views/index.html", { root: __dirname });
    ShortUrl.find().then((docs) => console.log(docs));
    res.render("index");
});

app.post("/longurl", (req, res) => {
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
});

app.get("/:urlId", (req, res) => {
    const urlId = req.params.urlId;
    ShortUrl.findOne({ urlHash: urlId })
        .then((doc) => {
            console.log(doc);
            res.render("redirect", { url: doc.url });
        })
        .catch((err) => {
            console.log(err);
            res.status(404).send("Page Not Found");
        });
});

app.use((req, res) => {
    res.status(404).send("Web Page Not Found");
});
