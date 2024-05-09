const mongoose = require("mongoose");

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
function connectDoDB(app, dbURI) {
    mongoose
        .connect(dbURI)
        .then(() => {
            console.log("MongoDB Connected...");
            app.listen(3000, () => {
                console.log("listening on port 3000...");
            });
        })
        .catch((err) => console.log(err));
}

module.exports = { connectDoDB };
