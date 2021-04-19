var io = io("http://localhost:5000");

// DOM Connections
var output = document.getElementById("messages"),
  handle = document.getElementById("handle"),
  message = document.getElementById("message"),
  sendButton = document.getElementById("send-btn"),
  form = document.getElementById("controls");

sendButton.addEventListener("click", function () {
  io.emit("message", {
    handle: handle.value,
    message: message.value,
    sentAt: new Date(),
  });

  form.reset();
});

message.addEventListener("keypress", function () {
  io.emit("typing", {
    handle: handle.value,
  });
});

io.emit("connection", function (socket) {});

io.on("typing", function (data) {
  //   Notifications
});

io.on("message", function (data) {
  const { handle, message, sentAt } = data;
  const time = new Date(sentAt).toLocaleString();
  output.innerHTML += `<div class='output'><p><span>${handle}</span> : ${message}</p><span class="sent-at">${time}</span></div>`;
});
