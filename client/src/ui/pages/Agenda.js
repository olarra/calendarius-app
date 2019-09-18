import React from "react";
import AuthService from "../../redux/auth/service";
import AgendaService from "../../redux/agenda/service";

import { Redirect } from "react-router-dom";
import moment from "moment";
import "rc-time-picker/assets/index.css"; // Time Input Picker
import "react-day-picker/lib/style.css"; // Agenda Picker
import "./Agenda.css";
// Include the locale utils designed for moment
import MomentLocaleUtils from "react-day-picker/moment";
import "moment/locale/fr";

import {
  Container,
  ButtonToolbar,
  Row,
  Col,
  Image,
  Form,
  Alert,
  Button
} from "react-bootstrap";
import DayPicker from "react-day-picker";
import { Header, OCFTypeDateIndicator, OCFButton, OCFListGroup, OCFModal } from "../common";
export class Agenda extends React.Component {

  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.state = {
      date : undefined,
      locale: "fr",
      modalShow : false,
      selectedMeetingOnList : {},
      formMode : ""
    };
  }

  componentDidMount() {

    AuthService.isAuthenticated().then(res => {
      this.props.setUser(res.data.user)
    });

    this.props.fetchAgenda();

  }
  // isAuthenticated() {
  //   AuthService.isAuthenticated();
  // }

  logout() {
    AuthService.logout().then(res => {
      console.log(res);
      return res.status === 200 && this.props.history.push("/");
    });
  }

  getSelectedDate() {
    return this.state.date
      ? (<p>
        <strong>{this.state.date.toLocaleDateString()}</strong>
      </p>)
      : (<p>Choisissez un jour s'il vous plaît</p>);
  }

  setSelectedMeeting(meeting,location){
    // Set selected Meeting and open the modal... The modal will receive the state.selectedMeetingOnList
    console.log("LOCATION",location)
    this.setState({selectedMeetingOnList :{...meeting,...location}})
    this.setState({formMode:"EDITION"})
    this.setState({modalShow : !this.state.modalShow})
  }

  resetFormData(){
    // Set selected Meeting and open the modal... The modal will receive the state.selectedMeetingOnList
    this.setState({selectedMeetingOnList :{}})
    this.setState({date :undefined})
    this.setState({modalShow : !this.state.modalShow})
  }

  renderMeetingsList() {
    if (this.props.agenda.length) {
      return <OCFListGroup agenda={this.props.agenda} editMeeting={(meeting,location)=>this.setSelectedMeeting(meeting,location)} deleteMeeting={(iAgenda, iMeeting) => this.deleteMeeting(iAgenda, iMeeting)}></OCFListGroup>
    }
  }

  addMeeting(formData) {
    // add metting from container redux actions
    const { addMeeting } = this.props;
    let meeting = {
      date: formData.date.toLocaleDateString(),
      label : formData.label,
      startHour :formData.startHour,
      endHour : formData.endHour
    };

    addMeeting(meeting);
    this.setState({modalShow: !this.state.modalShow})

  }

  updateMeeting(formData){
    console.log('FORMDATA', formData)
    this.props.updateMeeting(formData);
    this.setState({modalShow: !this.state.modalShow})
  }

  handleDayClick(day, { selected, disabled }) {
    if (disabled) {
      // Day is disabled, do nothing
      return;
    }
    if (selected) {
      // Unselect the day if already selected
      this.setState({ date: undefined });
      return;
    }
    this.setState({ date: day });
  }

  openModalInCreationMode(){

    this.setState({formMode:"CREATION"})
    this.setState({modalShow:true})
  }

  renderAddButton() {
    return (<OCFButton className={this.state.date
      ? "addButton"
      : 'addButton-disabled'} disabled={!this.state.date} onClick={() => this.openModalInCreationMode()}>
      +
    </OCFButton>);
  }



  deleteMeeting(agendaIndex, meetingIndex) {
    console.log("You clicked the => ", agendaIndex, meetingIndex);
    this.props.removeMeeting(agendaIndex, meetingIndex);
  }

  render() {


    const modifiers = {
      thursdays: {
        daysOfWeek: [5]
      },
      today: new Date(Date.now())
    };

    const modifiersStyles = {
      today: {
        color: "white",
        backgroundColor: "#ffc107"
      },
      thursdays: {
        color: "#ffc107",
        backgroundColor: "#fffdee"
      }
    };

    return (<div>
      <Header logout={() => this.logout()} user={this.props.auth.user} />

      <Container fluid={true}>
        <Row>
          <Col xs={6} className="c-agenda-col-left">
            <div className="c-date-picker">{this.renderAddButton()}</div>
            <DayPicker localeUtils={MomentLocaleUtils} locale={this.state.locale} modifiers={modifiers} modifiersStyles={modifiersStyles} disabledDays={{
              daysOfWeek: [0, 6]
            }} selectedDays={this.state.date} onDayClick={this.handleDayClick} />
            <div className="c-date-type">
              <OCFTypeDateIndicator label="Aaujourd'hui" color="#ffc107"></OCFTypeDateIndicator>
              <OCFTypeDateIndicator label="Meeting" color="#9980FA"></OCFTypeDateIndicator>
            </div>

          </Col>
          <Col className="c-agenda-col-right">




              <OCFModal
                formMode={this.state.formMode}
                date={this.state.date}
                addMeeting={(meeting)=>this.addMeeting(meeting)}
                updateMeeting={(meeting)=>this.updateMeeting(meeting)}
                resetFormData={()=>this.resetFormData({})}
                show={this.state.modalShow}
                selectedMeetingOnList={this.state.selectedMeetingOnList}
                onHide={() => this.setState({modalShow:false})}
              />

            <p>My meetings</p>

            {this.renderMeetingsList()}

          </Col>
        </Row>
      </Container>
    </div>);
  }
}

const styles = {};
