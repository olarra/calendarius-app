import React, { Component } from "react";
import { Public, Protected, Login, NoMatch } from "../ui/pages";
import { Header } from "../ui/common";
import { PrivateRoute } from "./PrivateRoute";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthContainer } from "../containers";
export const CalendariousRouter = () => {
  return (
    <React.Fragment>
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={AuthContainer} />
            <Route path="/login" component={Login} />

            <PrivateRoute>
              <Route path="/protected" component={Protected} />
            </PrivateRoute>

            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    </React.Fragment>
  );
};
