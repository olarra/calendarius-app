import React from "react";
import AuthService from "../../redux/auth/service";
import {Redirect} from "react-router-dom";
import moment from "moment";
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css'; // Time Input Picker
import "react-day-picker/lib/style.css"; // Agenda Picker
import "./Agenda.css";
// Include the locale utils designed for moment
import MomentLocaleUtils from 'react-day-picker/moment';
import 'moment/locale/fr';

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
import {Header} from "../common";

export class Agenda extends React.Component {
  state = {
    selectedDay: undefined,
    locale: 'fr',
    labelMeeting: "",
    startHourMeeting: null,
    endHourMeeting: null
  };

  componentDidMount() {
    this.setState({startHourMeeting : moment().hour(0).minute(0).format('h:mm a') })
    this.setState({endHourMeeting : moment().hour(1).minute(30).format('h:mm a') })
  }
  isAuthenticated() {
    AuthService.isAuthenticated();
  }

  logout() {
    AuthService.logout().then(res => {
      console.log(res);
      return res.status === 200 && this.props.history.push("/");
    });
  }

  getSelectedDate(){
    return this.state.selectedDay
      ? (<p><strong>{this.state.selectedDay.toLocaleDateString()}</strong></p>)
      : (<p>Choisissez un jour s'il vous plaît</p>)
  }

  profile() {
    AuthService.profile();
  }

  handleDayClick(day) {
    this.setState({selectedDay: day});
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
    console.log(value && value.format('h:mm a'));
    this.setState({startHourMeeting: value.format('h:mm a')})
  }

  onChangeEndTime(value) {
    console.log(value && value.format('h:mm a'));
    this.setState({endHourMeeting: value.format('h:mm a')})
  }

  render() {
    const format = 'h:mm a';

    const now = moment().hour(0).minute(0);
    const future = moment().hour(1).minute(30);

    const modifiers = {
      thursdays: {
        daysOfWeek: [5]
      },
      meeting: new Date("2019-9-16")
    };

    const modifiersStyles = {
      meeting: {
        color: 'white',
        backgroundColor: '#ffc107'
      },
      thursdays: {
        color: '#ffc107',
        backgroundColor: '#fffdee'
      }
    };

    return (<div>
      <Header/>

      <Container fluid={true}>
        <Row>
          <Col xs={6} className="c-agenda-col-left">
            <h3>Agenda</h3>
            <DayPicker localeUtils={MomentLocaleUtils} locale={this.state.locale} modifiers={modifiers} modifiersStyles={modifiersStyles} disabledDays={{
                daysOfWeek: [0, 6]
              }} selectedDays={this.state.selectedDay} onDayClick={day => this.handleDayClick(day)}/>
          </Col>
          <Col>
            <button onClick={() => this.isAuthenticated()}>is auth</button>
            <button onClick={() => this.logout()}>out</button>
            <button onClick={() => this.profile()}>profile</button>

            <Form style={{
                width: "50%",
                marginTop: 20
              }}>

              <Form.Label className="purpleText">
                Date Choisie
              </Form.Label>
              <div>
                {this.getSelectedDate()}
              </div>



              <Form.Group controlId="formGroupLabelMeeting">
                <Form.Label className="purpleText">
                  Intitulé de la réunion
                </Form.Label>
                <Form.Control name="labelMeeting" value={this.state.labelMeeting} onChange={e => this.handleChange(e)} type="text" placeholder="Username"/>
              </Form.Group>
              <Form.Group controlId="formGroupStartHour">
                <Form.Label className="purpleText">
                  Heure de début
                </Form.Label>
                <TimePicker className="timePicker" defaultValue={now} showSecond={false} onChange={e => this.onChangeStartTime(e)} format={format} use12Hours inputReadOnly/>
              </Form.Group>
              <Form.Group controlId="formGroupEndHour">
                <Form.Label className="purpleText">
                  Heure de fin
                </Form.Label>
                <TimePicker className="timePicker" defaultValue={future} showSecond={false} onChange={e => this.onChangeEndTime(e)} format={format} use12Hours inputReadOnly/>

              </Form.Group>

            </Form>
            <Button variant="success" onClick={()=>console.log("state", this.state)}>
              Submit
            </Button>
            <p>labelMeeting :{this.state.labelMeeting}</p>
            <p>startHourMeeting :{this.state.startHourMeeting}</p>
            <p>endHourMeeting :{this.state.endHourMeeting}</p>

          </Col>
        </Row>
      </Container>
    </div>);
  }
}

const styles = {};
