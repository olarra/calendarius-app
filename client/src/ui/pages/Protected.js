import React from "react";
import AuthService from "../../redux/auth/service";

export class Protected extends React.Component {

  isAuthenticated(){
    AuthService.isAuthenticated();
  }
  render(){

    return (<div>
      <h3>Protected</h3>
      <button onClick={()=> this.isAuthenticated()}>is auth</button>
    </div>)
  }
}
