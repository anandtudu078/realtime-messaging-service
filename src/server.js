const app = require("./app");
const env = require("./config/env");
const connectDatabase = require("./config/database");
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);


const startServer = async () => {
  await connectDatabase();

  app.listen(env.port, () => {
    console.log(`Server running on port ${env.port}`);
  });
};

startServer();