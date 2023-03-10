const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const app = require("./app");

//CONNECT DATABASE
const DB = process.env.DB_HOST.replace("<password>", process.env.DB_PASSWORD);
mongoose
    .connect(DB)
    .then(() => {
        console.log("Database connected");
    })
    .catch((err) => {
        console.log(err);
    });

// RUN SERVER
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
