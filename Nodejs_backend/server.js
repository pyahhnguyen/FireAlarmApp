const {app} = require("./src/app");
const PORT = process.env.PORT || 3052;

const server_express = app.listen(PORT, () => {
  console.log("Server running on port " + PORT);

});


process.on("SIGINT", () => {
  server_express.close(() => {
    wss.close(() => {
      console.log("WebSocket server and Express server closed");
    });
  });
});