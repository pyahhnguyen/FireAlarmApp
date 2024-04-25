const {app} = require("./src/app");
const mongoose = require("mongoose")
const PORT = process.env.PORT || 3000;

const server_express = app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

process.on("SIGINT", () => {
  server_express.close(() => {
    // wss.close(() => {
      console.log("Server closed !!!");
    // });
  });

  // If you are using MongoDB with Mongoose, for example:
  mongoose.connection.close(false, () => {
      console.log('MongoDb connection closed.');
  });

  // If you have other cleanup tasks, address them here:
  // For AWS IoT or other connections that need to be closed:
  // device.end(true, () => console.log('AWS IoT Disconnected'));

  // After all are closed, exit:
  process.exit(0);
});