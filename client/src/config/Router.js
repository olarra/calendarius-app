import React, { Component } from "react";
import { Public, Protected, Login, NoMatch } from "../ui/pages";
import { Header } from "../ui/common";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export const CalendariousRouter = () => {
  return (
    <React.Fragment>
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/protected" component={Protected} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    </React.Fragment>
  );
};
