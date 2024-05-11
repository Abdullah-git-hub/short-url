const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
    {
        url: {
            type: String,
            required: true,
        },
        urlHash: {
            type: String,
            required: true,
            unique: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
    },
    { timestamps: true }
);

const ShortUrl = mongoose.model("url", urlSchema);

module.exports = { ShortUrl };

// const { MongoClient } = require("mongodb");

// let dbConnection;

// const connectToDB = (connection_string, callback) => {
//     MongoClient.connect(connection_string)
//         .then((client) => {
//             dbConnection = client.db();
//             return callback();
//         })
//         .catch((err) => {
//             console.log(err);
//             return callback(err);
//         });
// };

// const getDB = () => dbConnection;

// module.exports = { connectToDB, getDB };
