const http = require("http");
const dotenv = require("dotenv");
dotenv.config();

const database = require("./config/database");
const app = require("./app");
const configureSocketServer = require("./socketServer");
//CONNECT DATABASE
database.connect();

const server = http.createServer(app);
configureSocketServer(server);

// RUN SERVER
const port = process.env.PORT || 8080;
server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
