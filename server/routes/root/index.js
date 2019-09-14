import { Router } from "express";
import { passportConfig } from "../../config";

export default () => {
  const router = new Router();
  const passport = passportConfig();

  /**
   * @api {GET} /login Request Home Page
   * @apiGroup Main
   * @apiSuccess {String} firstname Firstname of the User.
   */

  // create the homepage route at '/'
  router.get('/', (req, res) => {
    console.log('Inside the homepage callback function')
    console.log(req.sessionID)
    res.send(`Server OK!\n ${req.sessionID}`)
  })

  /**
   * @api {GET} / Request Home Page
   * @apiGroup Main
   * @apiSuccess {String} You got home page!
   */

  router.get("/user", (req, res) => {
    req.isAuthenticated()
      ? res.status(200).json({ message: "success", user: user })
      : res.status(404).json({ message: "user not authenticated" });
  });

  // GET /logout
  router.get("/logout", (req, res, next) => {
    if (req.session) {
      req.session.destroy(err => (err ? next(err) : res.redirect("/")));
    }
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
      // Strategy define if user is append to req object or not
      req.login(user, err => {
        return user
          ? res.status(200).json({ message: "success", user: user })
          : res.status(401).json({ message: "Invalid username or password" });
      });
    })(req, res, next);
  });

  router.get("/authenticated", (req, res) => {
    console.log("GET /authenticated",JSON.stringify(req.headers,null,2));
    console.log(`req.session? ${JSON.stringify(req.session)}`);
    console.log('REQ.ISAUTHENTICATED()', req.isAuthenticated())
    if (req.isAuthenticated()) {
      res.status(200).json({message :"you hit the authentication endpoint\n"});
    } else {
      res.redirect("/login");
    }
  });

  return router;
};
