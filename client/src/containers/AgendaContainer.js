/* React Dependencies */
import React from "react";
/* React Redux */
import { connect } from "react-redux";
/* Local Dependencies */
import selectAuth from "../redux/auth/selector";
import { Agenda } from "../ui/pages";

/**
 * AuthenticationContainer Container will render the Auth UI
 * it will pass down the code data from the NEXMO API
 */
class AgendaContainer extends React.Component {
  render() {
    console.log("PROPS", this.props)
    return <Agenda {...this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    auth: selectAuth(state)
  };
};

const mapActionsToDispatch = dispatch => ({});

const mergeProps = (state, actions, ownProps) => ({
  ...state,
  ...actions,
  ...ownProps
});

export default connect(
  mapStateToProps,
  mapActionsToDispatch,
  mergeProps
)(AgendaContainer);
