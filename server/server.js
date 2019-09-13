import express from "express";
import uuid from "uuid/v4";
import expressSession from "express-session";
import sessionFileStore from "session-file-store";

const FileStore = sessionFileStore(expressSession);

export class CalendariusServer {
  constructor() {
    this.createApp();
    this.config();
    this.initSession();
    this.defineRoutes();
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

  config() {
    this._port = process.env.PORT || 8080;
  }

  defineRoutes() {
    this._app.get("/", (req, res) => {
      console.log("Inside the homepage callback function");
      console.log(req.sessionID);
      res.send(`you just hit the home page\n`);
    });
  }

  listen() {
    this._app.listen(this._port, () => {
      console.log("Running server on port %s", this._port);
    });
  }
}
