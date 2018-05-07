const mongoose = require("mongoose");
const logger = require("../logger");

let mongoURL = "mongodb://localhost/test";

mongoose.Promise = global.Promise;
mongoose.connect(mongoURL);

// CONNECTION EVENTS
mongoose.connection.on("connected", () => {
  logger.info(`Mongoose connected to ${mongoURL}`);
});
mongoose.connection.on("error", err => {
  logger.error(`Mongoose connection error: ' ${err}, mongoURL: ${mongoURL}`);
});
mongoose.connection.on("disconnected", () => {
  logger.info("Mongoose disconnected");
});

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
const gracefulShutdown = (msg, callback) => {
  mongoose.connection.close(() => {
    logger.info(`Mongoose disconnected through ${msg}`);
    callback();
  });
};
// For nodemon restarts
process.once("SIGUSR2", () => {
  gracefulShutdown("nodemon restart", () => {
    process.kill(process.pid, "SIGUSR2");
  });
});
// For app termination
process.on("SIGINT", () => {
  gracefulShutdown("app termination", () => {
    process.exit(0);
  });
});
// For Heroku app termination
process.on("SIGTERM", () => {
  gracefulShutdown("Heroku app termination", () => {
    process.exit(0);
  });
});

require("./models/user");
require("./models/sequences");
require("./models/clickData");
require("./models/unusualSequence");
