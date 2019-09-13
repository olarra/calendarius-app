import express from "express";
import uuid from "uuid/v4";
import expressSession from "express-session";
import sessionFileStore from "session-file-store";
import mainRoutes from "./routes/root";
import passport from "passport";
import { serverConfig, config } from "./config";
import bodyParser from "body-parser";

const FileStore = sessionFileStore(expressSession);

export class CalendariusServer {
  constructor() {
    this._router = new express.Router();
    this.createApp();
    serverConfig(this._app);
    this.loadPassportConfig();
    this.initSession();
    this.loadRoutes();
    this.listen();
  }

  createApp() {
    this._app = express();
  }

  initSession() {
    // add & configure middleware
    this._app.use(
      expressSession({
        genid: req => {
          console.log("Inside the session middleware");
          console.log(req.sessionID);
          return uuid(); // use UUIDs for session IDs
        },
        store: new FileStore(),
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: true
      })
    );
  }

  loadPassportConfig() {
    this._app.use(passport.initialize());
    this._app.use(passport.session());
  }

  loadRoutes() {
    this._app.use("/", mainRoutes());
  }

  listen() {
    const port = process.env.PORT || config.SERVER.port;
    this._app.listen(process.env.PORT || 8080, () => {
      console.log("Running server on port %s", port);
    });
  }
}
