const mongoose = require("mongoose");

exports.connect = async () => {
    const DB = process.env.DB_HOST.replace("<password>", process.env.DB_PASSWORD);
    try {
        await mongoose.connect(DB);
        console.log("Database connection successful");
    } catch (err) {
        console.log(err);
    }
};
