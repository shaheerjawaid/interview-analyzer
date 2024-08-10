const mongoose = require('mongoose');

let dbConnection;
mongoose.set("strictQuery", false);

try {
    dbConnection = mongoose.connect(process.env.DATABASE_URL, { autoIndex: true });
} catch (error) {
    return console.log(`Unable to connect \n\n ${error}`);
}

module.exports = dbConnection;