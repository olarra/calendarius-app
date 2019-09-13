import { Router } from "express";

export default () => {
  const router = new Router();
  console.log("Inside Router");
  /** GET : /  **/
  router.get("/", (req, res) => {
    console.log("Inside the homepage callback function");
    console.log(req.sessionID);
    res.send(`you just hit the home page\n`);
  });
  return router;
};
