const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const socketIo = require("socket.io");
var cors = require("cors");

const app = express();
const port = process.env.PORT || 8080;
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());
app.use(bodyParser.json());

app.set("socketio", io);

require("./Server/index");

const api = require("./server/routes");

app.use("/api", api);

io.on("connection", socket => {
  //   socket.emit("FromAPI", "hello");
  //   socket.on("disconnect", () => console.log("Client disconnected"));
});

server.listen(port, () => console.log(`Listening on port ${port}`));
