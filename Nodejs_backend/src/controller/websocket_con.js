const WebSocket = require("ws");

const clients = [];

const wss = new WebSocket.Server({ noServer: true });

wss.on("connection", (ws) => {
  console.log("WebSocket client connected");
  clients.push(ws);

  ws.on("message", (message) => {
    console.log(`Received: ${message}`);
  });

  ws.on("close", () => {
    console.log("WebSocket client disconnected");
    const index = clients.indexOf(ws);
    if (index > -1) {
      clients.splice(index, 1);
    }
  });
});

function broadcastUpdate(updatedData) {
  const dataString = JSON.stringify(updatedData);
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(dataString);
    }
  });
}

module.exports = { wss, broadcastUpdate };
