import React, {Component} from "react";
import {Form, Button} from "react-bootstrap";
import TimePicker from "rc-time-picker";
import moment from "moment";

export class OCFForm extends Component {
  state = {
    date: undefined,
    label: "",
    startHour: null,
    endHour: null,
  }

  componentDidMount(){
    this.props.date ? this.setState({date:this.props.date}): this.setState({date:this.props.selectedMeetingOnList.date})
    this.setState({ startHour: moment().hour(0).minute(0).format("h:mm a") });
    this.setState({ endHour: moment().hour(1).minute(30).format("h:mm a") });
  }

  handleChange(e) {
    console.log("change", e.target.name);
    // If you are using babel, you can use ES 6 dictionary syntax
    // let change = { [e.target.name] = e.target.value }
    let change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
  }

  renderActionButton(){
    const { date, addMeeting, updateMeeting} = this.props;
    if(date) {
      return <Button style={{
        alginSelf: "flex-start"
      }} variant="success" onClick={() => addMeeting(this.state)} disabled={!this.isMeetingValid()}>
        Submit
      </Button>
    }
    else {
      return <Button style={{
        alginSelf: "flex-start"
      }} variant="warning" onClick={() => updateMeeting(this.state)} disabled={!this.isMeetingValid()}>
        Update
      </Button>
    }
  }

  isMeetingValid() {
    const { date, label, startHour, endHour } = this.state;

    const startTime = moment(startHour, "HH:mm a");
    const endTime = moment(endHour, "HH:mm a");

    return ((date != null || this.props.selectedMeetingOnList.date) && label !== "" && moment(startTime).isBefore(endTime))
  }

  onChangeStartTime(value) {
    console.log(value && value.format("h:mm a"));
    this.setState({ startHour: value.format("h:mm a") });
  }

  onChangeEndTime(value) {
    console.log(value && value.format("h:mm a"));
    this.setState({ endHour: value.format("h:mm a") });
  }

  getSelectedDate() {
    return this.props.date
      ? (<p>
        <strong>{this.props.date.toLocaleDateString()}</strong>
      </p>)
      : (<p><strong>{this.props.selectedMeetingOnList.date}</strong></p>);
  }

  render(){
    const { date } = this.props;
    const format = "h:mm a";
    const now = moment().hour(0).minute(0);
    const future = moment().hour(1).minute(30);

    return (<div className="c-form">

    <Form style={{
      width: "60%",
      marginTop: 20
    }}>
      <Form.Label className="purpleText">Date Choisie
        <span className="required">(*)</span>
      </Form.Label>
      <div>

          {this.getSelectedDate()}

      </div>
      <Form.Group controlId="formGroupLabelMeeting">
        <Form.Label className="purpleText">
          Intitulé de la réunion
          <span className="required">(*)</span>
        </Form.Label>
        <Form.Control name="label" value={this.state.label} onChange={e => this.handleChange(e)} type="text" placeholder="Quel est le but de la réunion" />
      </Form.Group>
      <Form.Group controlId="formGroupStartHour">
        <Form.Label className="purpleText">Heure de début
          <span className="required">(*)</span>
        </Form.Label>
        <TimePicker style={{
          display: "block"
        }} className="timePicker" defaultValue={now} showSecond={false} onChange={e => this.onChangeStartTime(e)} format={format} use12Hours={true} inputReadOnly={true} />
      </Form.Group>
      <Form.Group controlId="formGroupEndHour">
        <Form.Label className="purpleText">Heure de fin
          <span className="required">(*)</span>
        </Form.Label>
        <TimePicker style={{
          display: "block"
        }} className="timePicker" defaultValue={future} showSecond={false} onChange={e => this.onChangeEndTime(e)} format={format} use12Hours={true} inputReadOnly={true} />
      </Form.Group>
    </Form>
    <div style={{ position: "absolute", bottom: "-55px", right: "100px" }}>
      {this.renderActionButton()}
    </div>


    </div>)
  }
}
