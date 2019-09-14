/* React Dependencies */
import React from "react";
/* React Redux */
import { connect } from "react-redux";
/* Local Dependencies */
import { requestLogin } from "../redux/auth/actions";
import selectAuth from "../redux/auth/selector";
import { Login } from "../ui/pages";

/**
 * AuthenticationContainer Container will render the Auth UI
 * it will pass down the code data from the NEXMO API
 */
class AuthContainer extends React.Component {
  render() {
    return <Login {...this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    auth: selectAuth(state)
  };
};

const mapActionsToDispatch = dispatch => ({
  requestLogin: userIdentity => dispatch(requestLogin(userIdentity))
});

const mergeProps = (state, actions, ownProps) => ({
  ...state,
  ...actions,
  ...ownProps
});

export default connect(
  mapStateToProps,
  mapActionsToDispatch,
  mergeProps
)(AuthContainer);
