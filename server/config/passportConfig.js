import passport from "passport";
import passportLocal from "passport-local";
import { config } from "./env";

const LocalStrategy = passportLocal.Strategy;

const users = config.USERS;

/**
 * Sign in using Email and Password.
 */
export const passportConfig = () => {
  console.log("PASSPORT-Config");

  // configure passport.js to use the local strategy

  passport.use(
    new LocalStrategy(config.PASSPORT, (username, password, done) => {
      console.log("LocalStrategy");
      // here is where you make a call to the database
      // to find the user based on their username or email address
      // for now, we'll just pretend we found that it was users[0]
      const user = users[0];

      if (username === user.username && password === user.password) {
        console.log("Local strategy returned true");
        return done(null, user);
      } else {
        return done(null, false, {
          message: "Invalid email or password."
        });
      }
    })
  );

  /** serializeUser determines which data of the user object should be stored in the session.
   * The result of the serializeUser method is attached to the session
   * as req.session.passport.user = {} **/
  passport.serializeUser((user, done) => {
    console.log(
      "Inside serializeUser callback. User id is save to the session file store here"
    );
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    console.log(" deserializeUser...");
    console.log(
      `The user id passport saved in the session file store is: ${id}`
    );
    const user = users[0].id === id ? users[0] : false;
    done(null, user);
  });

  return passport;
};
