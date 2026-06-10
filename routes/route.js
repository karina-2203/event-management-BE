const userRoute = require("./router/userRoute");
const eventRoute = require("./router/eventRoute");

module.exports = (app) => {
  app.use("/api", userRoute);
  app.use("/common", userRoute);
  app.use("/api/eventMange", eventRoute);
};
