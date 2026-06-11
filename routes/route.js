const UserRoute = require("./router/userRoute");
const addressRoute = require("./router/addressRoute");

module.exports = (app) => {
  app.use("/api", UserRoute);
  app.use("/common", UserRoute);
  app.use("/api/address", addressRoute);
};
