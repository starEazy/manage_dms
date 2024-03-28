const express = require("express");
const app = express();
const cluster = require("cluster");
const os = require("os");
const http = require("http");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();
const port = process.env.PORT || 8000;
const bodyparser = require("body-parser");
const debug = require("debug");
const numCPUs = os.cpus().length;
const AuthRoutes = require("./Routes/AuthRoutes");
const GlobalRoutes = require("./Routes/GlobalRoutes");
const DashboardRoutes = require("./Routes/DashboardRoutes");
const MasterRoutes = require("./Routes/MasterRoutes");
const ExcelUploadRoutes = require("./Routes/ExcelUploadRoutes");
const compression = require("compression");
const routerModule = require('./Routes');
// const db = require("./database/models/index");
// db.sequelize.sync();

// if (cluster.isMaster) {
  // Fork workers
  // for (let i = 0; i < numCPUs; i++) {
  //   cluster.fork();
  // }

  // cluster.on("exit", (worker, code, signal) => {
  //   console.log(`Worker ${worker.process.pid} died`);
  //   // Replace the dead worker
  //   cluster.fork();
  // });
// } else {
  const server = http.createServer(app);

  app.use((req, res, next) => {
    res.header("X-XSS-Protection", "1; mode=block");
    res.header("X-Frame-Options", "deny");
    res.header("X-Content-Type-Options", "nosniff");
    res.header(
      "Access-Control-Allow-Methods",
      "GET, PUT, POST, DELETE , HEAD , OPTIONS"
    );
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept,Authorization, X-Token"
    );
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
  });

  app.use(bodyparser.urlencoded({ extended: false }));
  app.use(bodyparser.json());
  // app.use("/api", routes);
  app.get("/", (req, res) => {
    console.log("API working");
    res.send("API working");
  });

  // app.use((req, res) => {
  //   return notFoundResponse(req, res, "URL Not found");
  // });
  const shouldCompress = (req, res) => {
    if (req.headers["x-no-compression"]) {
      return false;
    }
    return compression.filter(req, res);
  };

  app.use(
    compression({
      filter: shouldCompress,
      threshold: 9,
    })
  );
   // TODO ::route need to be implemented dynamically
    routerModule(app);

  app.use("/apiservice/api/Login", AuthRoutes);
  // app.use("/apiservice/api", GlobalRoutes);
  // app.use("/apiservice/api", DashboardRoutes);
  // app.use("/apiservice/api", MasterRoutes);
  // app.use("/apiservice/api", ExcelUploadRoutes);


  app.use(
    cors({
      origin: "*",
      allowedHeaders: "*",
      credentials: true,
      optionSuccessStatus: 200,
    })
  );

  app.use(helmet());

  server.listen(port);
  server.on("error", (error) => {
    if (error.syscall !== "listen") {
      throw error;
    }
    const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

    switch (error.code) {
      case "EACCES":
        console.error(bind + " requires elevated privileges");
        process.exit(1);

      case "EADDRINUSE":
        console.error(bind + " is already in use");
        process.exit(1);

      default:
        throw error;
    }
  });

  server.on("listening", () => {
    const addr = server.address();
    console.info(`The server has started on port: ${port}`);
    const bind =
      typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
    debug("Manage DMS server Listening on " + bind);
  });
// }
