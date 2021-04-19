var express = require("express");
var socket = require("socket.io");

var app = express();

const PORT = process.env.PORT || 5000;

// Setup Server
var server = app.listen(PORT, function () {
  console.log(`Server is listening at port ${PORT}`);
});

// Setup Socket
const io = socket(server);

io.on("connection", function (socket) {
  console.log("made a connection", socket.id);

  socket.on("message", function (data) {
    io.sockets.emit("message", data);
  });

  socket.on("typing", function (data) {
    socket.broadcast.emit("typing", data);
  });
});

app.use(express.static("public"));
