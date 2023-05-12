const dotenv = require("dotenv");
dotenv.config();

const database = require("./config/database");
const app = require("./app");

//CONNECT DATABASE
database.connect();

// RUN SERVER
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
