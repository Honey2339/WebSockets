const http = require("http");
const { WebSocketServer } = require("ws");
const url = require("url");
const uuidv4 = require("uuid").v4;

const server = http.createServer();
const PORT = 8000;

const wsServer = new WebSocketServer({ server: server });

const connections = {};
const users = {};

const broadcast = (message, senderUuid) => {
  Object.keys(connections).forEach((uuid) => {
    const connection = connections[uuid];
    if (
      users[uuid].roomId === users[senderUuid].roomId &&
      uuid !== senderUuid
    ) {
      connection.send(JSON.stringify(message));
    }
  });
};

const handleMessage = (bytes, uuid) => {
  const message = JSON.parse(bytes.toString());
  console.log(`Received message from ${uuid}: ${JSON.stringify(message)}`);
  broadcast(message, uuid);
};

wsServer.on("connection", (connection, request) => {
  const { roomId } = url.parse(request.url, true).query;
  const uuid = uuidv4();
  console.log(roomId, uuid);

  connections[uuid] = connection;

  users[uuid] = {
    roomId,
    message: "",
  };

  connection.on("message", (message) => handleMessage(message, uuid));
  connection.on("close", () => {
    delete connections[uuid];
    delete users[uuid];
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
