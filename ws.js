const { io } = require("socket.io-client");

// Connect to NestJS server (default 3000)
const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("Connected to NestJS WebSocket");

  // Emit event expected by @SubscribeMessage("get_users")
  socket.emit("get_users");
});

// Listen for response
socket.on("users_list", (users) => {
  console.log("Users received:", users);
});

socket.on("disconnect", () => {
  console.log("Disconnected");
});
