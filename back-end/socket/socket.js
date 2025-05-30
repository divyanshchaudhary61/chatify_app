// const {Server} = require("socket.io");

// const http = require("http");

// const express = require("express");

// const app = express();

// const server = http.createServer(app);

// const io = new Server(server, {
//     cors: {
//         origin: ["http://localhost:3000"],
//         methods: ["GET", "POST"],
//     },
// });

//  const getReceiverSocketId = (receiverId) =>{
//     return userSocketMap[receiverId]
// }

// const userSocketMap = {}

// io.on("connection", (socket) => {
//     console.log("a user connected", socket.id);
//     const userId = socket.handshake.query.userId

//     if (userId !== "undefined") userSocketMap[userId] = socket.id

//     // io.emit() is used to send events to all connected clients
//     io.emit("getOnlineUsers", Object.keys(userSocketMap))

//     // socket.on() is used to listen to the events. can be used both on client and server side
//     socket.on("disconnect", () => {
//         console.log("user disconnected", socket.id);
//         delete userSocketMap[userId]
//         io.emit("getOnlineUsers", Object.keys(userSocketMap))

//     });
// });

// module.exports = { app, io, server, getReceiverSocketId };


const { Server } = require("socket.io");
const http = require("http");
const express = require("express");

const app = express();
const server = http.createServer(app);

const allowedOrigins = [
  "http://localhost:3000",
  "https://chatify-app-eight.vercel.app", 
];

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const userSocketMap = {};

const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  const userId = socket.handshake.query.userId;

  if (userId && userId !== "undefined") {
    userSocketMap[userId] = socket.id;
  }

  // Emit updated list of online users
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    if (userId) {
      delete userSocketMap[userId];
    }
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

module.exports = { app, io, server, getReceiverSocketId };