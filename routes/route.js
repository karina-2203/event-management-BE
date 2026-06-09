const UserRoute = require("./router/userRoute");

module.exports = (app) => {
  app.use("/api", UserRoute);
  app.use("/common", UserRoute);
};
