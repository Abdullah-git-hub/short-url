const express = require("express");
const connectToDB = require("./connect");
const cookieParser = require("cookie-parser");
const URL = require("./models/url");
const { checkForAuthentication, restrictTo } = require("./middlewares/auth");

// routes
const urlRoute = require("./routes/url");
const userRoute = require("./routes/user");
const staticRoute = require("./routes/staticRoute");

const app = express();
const PORT = 3000;

connectToDB("mongodb://127.0.0.1:27017/new-short-url").then(() =>
    console.log("Connected to DB")
);

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(checkForAuthentication);

app.use("/url", restrictTo(["NORMAL", "ADMIN"]), urlRoute);
app.use("/user", userRoute);
app.use("/", staticRoute);

app.get("/url/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        { shortId },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                    ip: req.ip,
                },
            },
        }
    );

    // console.log(entry);
    res.redirect(entry.redirectUrl);
});

app.listen(PORT, () => console.log(`Listening on PORT:${PORT}`));
