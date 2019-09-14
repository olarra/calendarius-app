import { Redirect } from "react-router-dom";
import React from "react";

export const fakeAuth = {
  signedIn: false
};

export const PrivateRoute = ({ children }) => {
  return !fakeAuth.signedIn ? <Redirect to="/login" /> : children;
};
