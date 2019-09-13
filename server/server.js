import express from "express";

export class CalendariusServer {
  constructor() {
    this.createApp();
    this.config();
    this.listen();
  }

  createApp() {
    this._app = express();
  }

  config() {
    this._port = process.env.PORT || 8080;
  }

  listen() {
    this._app.listen(this._port, () => {
      console.log("Running server on port %s", this._port);
    });
  }
}
