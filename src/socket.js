const path = require('path');
const io = require(path.join(__dirname, "index.js"));

io.on("connection", (socket) => {
    socket.on("chat message", (msg, user) => {
        io.emit("chat message", msg, user);
    });
});