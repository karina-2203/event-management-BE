const userRoute = require("./router/userRoute");
const eventRoute = require("./router/eventRoute");
const serviceRoute = require("./router/serviceRoute");
const addressRoute = require("./router/addressRoute");
const bookingRoute = require("./router/bookingRoute");

module.exports = (app) => {
  app.use("/api", userRoute);
  app.use("/common", userRoute);
  app.use("/api/eventMange", eventRoute);
  app.use("/api/serviceMange", serviceRoute);
  app.use("/api/address", addressRoute);
  app.use("/api/booking", bookingRoute);
};
