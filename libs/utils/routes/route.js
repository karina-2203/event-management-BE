const UserRoute = require("./router/userRoute");
const commonRoute = require("./router/commonRoute")

module.exports = (app) => {
  app.use("/api/users", UserRoute);
  app.use("/common",commonRoute)
};
