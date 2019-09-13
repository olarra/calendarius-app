import { Router } from "express";

export default () => {
  const router = new Router();
  console.log("Inside Router");

  /**
   * @api {GET} / Request Home Page
   * @apiGroup Main
   * @apiSuccess {String} You got home page!
   */

  router.get("/", (req, res) => {
    console.log("Inside the homepage callback function");
    console.log(req.sessionID);
    res.send(`You got home page!\n`);
  });

  /**
   * @api {GET} /login Request Home Page
   * @apiGroup Main
   * @apiSuccess {String} firstname Firstname of the User.
   */

  router.get("/login", (req, res) => {
    console.log("Inside GET /login callback function");
    console.log(req.sessionID);
    res.send(`You got the login page!\n`);
  });

  /**
   * @api {POST} /login
   * @apiGroup Main
   * @apiParam {email} id Users unique ID.
   * @apiParam {password} Access password.
   *
   * @apiSuccess {Object} { user } User Information.
   */

  router.post("/login", (req, res) => {
    console.log("Inside POST /login callback function");
    console.log(req.body);
    res.send(`You posted to the login page!\n`);
  });

  return router;
};
