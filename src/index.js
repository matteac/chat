require("dotenv").config();

const path = require('path');
const session = require("express-session");

const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

module.exports = io;

const port = process.env.PORT || 4000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: "supersecret",
    resave: true,
    saveUninitialized: true,
}));
app.use(express.static(path.join(__dirname, 'public')));
const routes = require(path.join(__dirname, "routes", "routes.js"));
app.use(routes);

require(path.join(__dirname, "db.js"));
require(path.join(__dirname, "socket.js"));

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


