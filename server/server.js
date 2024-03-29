import express from "express";
import uuid from "uuid/v4";
import expressSession from "express-session";
import sessionFileStore from "session-file-store";
import mainRoutes from "./routes/root";
import agendaRoutes from "./routes/agenda";
import passport from "passport";
import { serverConfig, config } from "./config";

const FileStore = sessionFileStore(expressSession);

export class CalendariusServer {
  constructor() {
    this._router = new express.Router();
    this.createApp();
    serverConfig(this._app);
    this.initSession();
    this.loadPassportConfig();
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
        secret: "one-click-flare", //pick a random string to make the hash that is generated secure
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
      })
    );
  }

  loadPassportConfig() {
    this._app.use(passport.initialize());
    this._app.use(passport.session());
  }

  loadRoutes() {
    this._app.use("/", mainRoutes());
    this._app.use("/", agendaRoutes());
  }

  listen() {
    const port = process.env.PORT || config.SERVER.port;
    this._app.listen(process.env.PORT || port, () => {
      console.log("Running server on port %s", port);
    });
  }
}
