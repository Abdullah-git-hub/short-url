const express = require("express");
const { connectDoDB } = require("./services/connections");
const rootRoute = require("./routes/url");
const userRoute = require("./routes/user");

const app = express();

// connect mongoDB
// const dbURI = "mongodb+srv://arafat:120338@node-prac.e5v4exj.mongodb.net/Node-Prac?retryWrites=true&w=majority&appName=node-prac";
const dbURI = "mongodb://127.0.0.1:27017/short-Url";

connectDoDB(app, dbURI);

app.set("view engine", "ejs");
app.use("/public", express.static("./public"));
app.use(express.urlencoded({ extended: false }));

app.use("/", rootRoute);
app.use("/user", userRoute);

app.use((req, res) => {
    res.status(404).send("Web Page Not Found");
});
