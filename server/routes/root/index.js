import { Router } from "express";
import { passportConfig } from "../../config";
import authMiddelwares from "../../middelwares/auth";

export default () => {
  const router = new Router();
  const passport = passportConfig();

  /**
   * @api {GET} /login Request Home Page
   * @apiGroup Main
   * @apiSuccess {String} firstname Firstname of the User.
   */

  // create the homepage route at '/'
  router.get("/", (req, res) => {
    res.send(`Server OK!\n ${req.sessionID}`);
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

  router.get("/protected", authMiddelwares.isLoggedIn, (req, res) => {
    res.status(200).json({ message: "you hit the authentication endpoint\n" });
  });

  router.get("/profile", authMiddelwares.isLoggedIn, function(req, res) {
    res.status(200).json({ user: req.user });
  });

  router.get("/logout", (req, res) => {
    req.logout(); // passport documentation : http://www.passportjs.org/docs/logout/
    req.session.destroy(err => {
      res
        .status(200)
        .clearCookie("connect.sid", { path: "/" })
        .json({ status: 200, message: "logout success" });
      ("/");
    });
  });

  return router;
};
