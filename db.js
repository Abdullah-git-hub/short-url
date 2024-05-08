const { MongoClient } = require("mongodb");

let dbConnection;

const connectToDB = (connection_string, callback) => {
    MongoClient.connect(connection_string)
        .then((client) => {
            dbConnection = client.db();
            return callback();
        })
        .catch((err) => {
            console.log(err);
            return callback(err);
        });
};

const getDB = () => dbConnection;

module.exports = { connectToDB, getDB };
