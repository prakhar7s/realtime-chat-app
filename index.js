var express = require("express");
var socket = require("socket.io");
var LISTENERS = require("./assets/listeners");

var app = express();

const PORT = process.env.PORT || 5000;

// Setup Server
var server = app.listen(PORT, function () {
  console.log(`Server is listening at port ${PORT}`);
});

// Setup Socket
const io = socket(server);

io.on(LISTENERS.CONNECTION, function (socket) {
  console.log("made a connection", socket.id);

  // Fetch data from db and pass to do frontend
  io.sockets.emit("INITIAL_MSGS", { msg: "Hello" });

  socket.on(LISTENERS.MESSAGE, function (data) {
    io.sockets.emit(LISTENERS.MESSAGE, data);
  });

  socket.on(LISTENERS.TYPING, function (data) {
    socket.broadcast.emit(LISTENERS.TYPING, data);
  });
});

app.use(express.static("public"));
