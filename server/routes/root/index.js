import { Router } from "express";
import { passportConfig } from "../../config";

export default () => {
  const router = new Router();
  const passport = passportConfig();

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

  router.post("/login", (req, res, next) => {
    console.log("body parsing", req.body);
    passport.authenticate("local", (err, user, info) => {
      // Here Local Strategy is triggere !!!
      // Strategy defin if user is append to req object or not
      req.login(user, err => {
        return user
          ? res.send("You were authenticated & logged in!\n")
          : res.send("You are not authenticated in!\n");
      });
    })(req, res, next);
  });

  return router;
};
