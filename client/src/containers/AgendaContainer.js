/* React Dependencies */
import React from "react";
/* React Redux */
import { connect } from "react-redux";
/* Local Dependencies */
import { addMeeting } from "../redux/agenda/actions";
import selectAgenda from "../redux/agenda/selector";
import selectAuth from "../redux/auth/selector";
import { setUser } from "../redux/auth/actions";


import { Agenda } from "../ui/pages";

/**
 * AuthenticationContainer Container will render the Auth UI
 * it will pass down the code data from the NEXMO API
 */
class AgendaContainer extends React.Component {
  render() {
    console.log("AGENDA PROPS", this.props)
    return <Agenda {...this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    agenda: selectAgenda(state),
    auth: selectAuth(state)
  };
};

const mapActionsToDispatch = dispatch => ({
  addMeeting : (meeting) => dispatch(addMeeting(meeting)),
  setUser: user => dispatch(setUser(user))
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
)(AgendaContainer);
