import React from "react";
import AuthService from "../../redux/auth/service";
import {Redirect} from "react-router-dom";

export class Protected extends React.Component {
  isAuthenticated() {
    AuthService.isAuthenticated();
  }

  logout() {
    AuthService.logout().then(res => {
      console.log(res);
      return res.status === 200 && this.props.history.push("/");;
    });
  }

  profile() {
    AuthService.profile();
  }

  render() {
    return (
      <div>
        <h3>Protected</h3>
        <button onClick={() => this.isAuthenticated()}>is auth</button>
        <button onClick={() => this.logout()}>out</button>
        <button onClick={() => this.profile()}>profile</button>
      </div>
    );
  }
}
