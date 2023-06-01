const socketIO = require("socket.io");
const Notification = require("./models/notificationModel");

function configureSocketServer(server) {
    const io = socketIO(server, {
        cors: {
            origin: function (origin, callback) {
                const whitelist = [process.env.FRONT_END_ADMIN_URL, process.env.FRONT_END_CLIENT_URL];
                if (whitelist.indexOf(origin) !== -1 || !origin) {
                    callback(null, true);
                } else {
                    callback(new Error("Not allowed by CORS"));
                }
            },
            credentials: true,
        },
    });

    io.on("connection", (socket) => {
        socket.on("newOrder", async (orderData) => {
            const { customer, content } = orderData;
            await Notification.create({
                customer: customer._id,
                content,
            });
            io.emit("customerOrder", content);
        });
    });
}

module.exports = configureSocketServer;
