const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });

// Array to store connected clients
const clients = [];

// Event listener for when a new WebSocket connection is established
wss.on("connection", function connection(ws) {
  // Add the new client to the list
  clients.push(ws);

  // Event listener for when a message is received from a client
  ws.on("message", function incoming(message) {
    console.log("received: %s", message);

    // Broadcast the received message to all connected clients
    clients.forEach(function (client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // Event listener for when a client closes the connection
  ws.on("close", function () {
    // Remove the client from the list
    const index = clients.indexOf(ws);
    if (index > -1) {
      clients.splice(index, 1);
    }
  });
});
