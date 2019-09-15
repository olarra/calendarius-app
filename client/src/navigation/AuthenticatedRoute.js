import {Redirect, withRouter} from "react-router-dom";
import React from "react";
import AuthService from "../redux/auth/service";

class AuthenticatedRoute extends React.Component {
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
    const {showIfNotLogged, children, history } = this.props;
    console.log("PROPS...",this.props)
    if (this.state.resolveAuth !== "end") {
      return <h3>Resolving</h3>;
    } else {
      return this.state.authenticated
        ? (<Redirect to="/home"/>)
        : children;
    }
  }
}

export default withRouter(AuthenticatedRoute)
