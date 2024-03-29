import {Redirect} from "react-router-dom";
import React from "react";
import AuthService from "../redux/auth/service";

export class PrivateRoute extends React.Component {
  state = {
    resolveAuth: "start",
    authenticated: false
  };

  componentDidMount() {
    AuthService.isAuthenticated().then(res => {
      return res.status === 200
        ? this.setState({authenticated: true, resolveAuth: "end"})
        : this.setState({resolveAuth: "end"});
    });
  }

  render() {
    const {showIfNotLogged, children } = this.props;
    if (this.state.resolveAuth !== "end") {
      return <div></div>;
    } else {
      return this.state.authenticated
        ? (children)
        : (<Redirect to="/"/>);
    }
  }
}
