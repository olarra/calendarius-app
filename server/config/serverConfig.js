import bodyParser from "body-parser";

export const serverConfig = app => {
  // Register routes
  app.use(bodyParser.json()); // support json encoded bodies
  app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies
};
