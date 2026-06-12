const userRoute = require("./router/userRoute");
const eventRoute = require("./router/eventRoute");
const serviceRoute = require("./router/serviceRoute");

module.exports = (app) => {
  app.use("/api", userRoute);
  app.use("/common", userRoute);
  app.use("/api/eventMange", eventRoute);
  app.use("/api/serviceMange", serviceRoute);
};
