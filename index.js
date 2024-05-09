const express = require("express");
const { connectDoDB } = require("./modules/connections");
const rootRoute = require("./routes/url");

const app = express();

// connect mongoDB
const dbURI =
    "mongodb+srv://arafat:120338@node-prac.e5v4exj.mongodb.net/Node-Prac?retryWrites=true&w=majority&appName=node-prac";

connectDoDB(app, dbURI);

app.set("view engine", "ejs");
app.use("/public", express.static("./public"));
app.use(express.json());

app.use("/", rootRoute);

app.use((req, res) => {
    res.status(404).send("Web Page Not Found");
});
