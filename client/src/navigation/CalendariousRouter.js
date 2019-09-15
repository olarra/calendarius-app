import React, { Component } from "react";
import { Public, Agenda } from "../ui/pages";
import { PrivateRoute } from "./PrivateRoute";


import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthContainer, AgendaContainer } from "../containers";
export const CalendariousRouter = () => {
  return (
    <React.Fragment>
      <Router>
        <div>
          <Switch>

             <Route exact path="/" component={AuthContainer} />



            <Route path="/home" component={Public} />

            <PrivateRoute >
              <Route path="/agenda" component={AgendaContainer} />
            </PrivateRoute>

          </Switch>
        </div>
      </Router>
    </React.Fragment>
  );
};
