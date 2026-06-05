const UserRoute = require("./router/userRoute");

module.exports = (app) => {
  app.use("/api/users", UserRoute);
};
