import React from "react";
import AuthService from "../../redux/auth/service";
import AgendaService from "../../redux/agenda/service";



import { Redirect } from "react-router-dom";
import moment from "moment";
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css"; // Time Input Picker
import "react-day-picker/lib/style.css"; // Agenda Picker
import "./Agenda.css";
// Include the locale utils designed for moment
import MomentLocaleUtils from "react-day-picker/moment";
import "moment/locale/fr";

import {
  Container,
  Row,
  Col,
  Image,
  Form,
  Alert,
  Button
} from "react-bootstrap";
import DayPicker from "react-day-picker";
import { Header, OCFTypeDateIndicator, OCFButton, OCFListGroup } from "../common";
export class Agenda extends React.Component {

  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.state = {
      date: undefined,
      locale: "fr",
      label: "",
      startHour: null,
      endHour: null
    };
  }


  componentDidMount() {

    AuthService.isAuthenticated().then(res => {
      this.props.setUser(res.data.user)
    });

    this.props.fetchAgenda();
    this.setState({
      startHour: moment()
        .hour(0)
        .minute(0)
        .format("h:mm a")
    });
    this.setState({
      endHour: moment()
        .hour(1)
        .minute(30)
        .format("h:mm a")
    });
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
    return this.state.date ? (
      <p>
        <strong>{this.state.date.toLocaleDateString()}</strong>
      </p>
    ) : (
        <p>Choisissez un jour s'il vous plaît</p>
      );
  }




  addMeeting() {
    const { addMeeting } = this.props;
    const {
      date,
      label,
      startHour,
      endHour
    } = this.state;
    let meeting = {
      date: date.toLocaleDateString(),
      label,
      startHour,
      endHour
    };
    console.log("addMeeting", this.props);

    console.log("i will add a metting to your Agenda", meeting);
    addMeeting(meeting);
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

  renderAddButton() {
    return (
    <OCFButton  className={this.state.date ? "addButton" : 'addButton-disabled'}

    disabled={!this.state.date} onClick={() => console.log("add")}>
      +
    </OCFButton>);
  }

  isMeetingValid() {
    const {
      date,
      label,
      startHour,
      endHour
    } = this.state;

    const startTime = moment(startHour, "HH:mm a");
    const endTime = moment(endHour, "HH:mm a");

    return (date != null && label !== "" && moment(startTime).isBefore(endTime))
  }

  handleChange(e) {
    console.log("change", e.target.name);
    // If you are using babel, you can use ES 6 dictionary syntax
    // let change = { [e.target.name] = e.target.value }
    let change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
  }

  onChangeStartTime(value) {
    console.log(value && value.format("h:mm a"));
    this.setState({ startHour: value.format("h:mm a") });
  }

  onChangeEndTime(value) {
    console.log(value && value.format("h:mm a"));
    this.setState({ endHour: value.format("h:mm a") });
  }

  deleteMeeting(agendaIndex,meetingIndex) {
    console.log("You clicked the => ", agendaIndex,meetingIndex);
    this.props.removeMeeting(agendaIndex,meetingIndex);
  }

  render() {
    const format = "h:mm a";

    const now = moment()
      .hour(0)
      .minute(0);
    const future = moment()
      .hour(1)
      .minute(30);

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


    return (
      <div>
        <Header logout={() => this.logout()} user={this.props.auth.user} />

        <Container fluid={true}>
          <Row>
            <Col xs={6} className="c-agenda-col-left">
              <div className="c-date-picker">{this.renderAddButton()}</div>
              <DayPicker
                localeUtils={MomentLocaleUtils}
                locale={this.state.locale}
                modifiers={modifiers}
                modifiersStyles={modifiersStyles}
                disabledDays={{
                  daysOfWeek: [0, 6]
                }}
                selectedDays={this.state.date}
                onDayClick={this.handleDayClick}
              />
              <div className="c-date-type">
                <OCFTypeDateIndicator label="Aaujourd'hui" color="#ffc107"></OCFTypeDateIndicator>
                <OCFTypeDateIndicator label="Meeting" color="#9980FA"></OCFTypeDateIndicator>
              </div>




            </Col>
            <Col className="c-agenda-col-right">
              <Form
                style={{
                  width: "60%",
                  marginTop: 100
                }}
              >
                <Form.Label className="purpleText">Date Choisie <span className="required">(*)</span></Form.Label>
                <div>{this.getSelectedDate()}</div>

                <Form.Group controlId="formGroupLabelMeeting">
                  <Form.Label className="purpleText">
                    Intitulé de la réunion <span className="required">(*)</span>
                  </Form.Label>
                  <Form.Control
                    name="label"
                    value={this.state.label}
                    onChange={e => this.handleChange(e)}
                    type="text"
                    placeholder="Quel est le but de la réunion"
                  />
                </Form.Group>
                <Form.Group controlId="formGroupStartHour">
                  <Form.Label className="purpleText">Heure de début <span className="required">(*)</span></Form.Label>
                  <TimePicker
                    style={{ display: "block" }}
                    className="timePicker"
                    defaultValue={now}
                    showSecond={false}
                    onChange={e => this.onChangeStartTime(e)}
                    format={format}
                    use12Hours={true}
                    inputReadOnly={true}
                  />
                </Form.Group>
                <Form.Group controlId="formGroupEndHour">
                  <Form.Label className="purpleText">Heure de fin <span className="required">(*)</span></Form.Label>
                  <TimePicker
                    style={{ display: "block" }}
                    className="timePicker"
                    defaultValue={future}
                    showSecond={false}
                    onChange={e => this.onChangeEndTime(e)}
                    format={format}
                    use12Hours={true}
                    inputReadOnly={true}
                  />
                </Form.Group>
              </Form>
              <div style={{
                width: "60%",
                marginTop: 20
              }}>
                <Button style={{ alginSelf: "flex-start" }} variant="success" onClick={() => this.addMeeting()} disabled={!this.isMeetingValid()}>
                  Submit
              </Button>
              </div>
              <p>My meetings</p>



              <OCFListGroup agenda={this.props.agenda} deleteMeeting={(iAgenda,iMeeting)=> this.deleteMeeting(iAgenda,iMeeting)}></OCFListGroup>

            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const styles = {};
