import React, { Component } from "react";
import { Public, Protected, Login, NoMatch } from "../ui/pages";
import { Header } from "../ui/common";
import { PrivateRoute } from "./PrivateRoute";
import { AuthenticatedRoute } from "./AuthenticatedRoute";


import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthContainer } from "../containers";
export const CalendariousRouter = () => {
  return (
    <React.Fragment>
      <Router>
        <div>
          <Switch>

             <Route exact path="/" component={AuthContainer} />



            <Route path="/home" component={Public} />

            <PrivateRoute >
              <Route path="/protected" component={Protected} />
            </PrivateRoute>

          </Switch>
        </div>
      </Router>
    </React.Fragment>
  );
};
