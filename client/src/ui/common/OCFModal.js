import React, {Component} from "react";
import {Modal, Button} from "react-bootstrap";
import { OCFForm } from "./OCFForm";

export class OCFModal extends Component {

  render() {
    const {date, resetFormData, addMeeting, show, selectedMeetingOnList, onHide, updateMeeting , formMode} = this.props;
    return <Modal show={show} onHide={onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered="centered" backdrop="static">
      <Modal.Header closeButton={false}>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <OCFForm formMode={formMode} date={date} addMeeting={(meeting)=>addMeeting(meeting)} updateMeeting={(meeting)=>updateMeeting(meeting)}selectedMeetingOnList={selectedMeetingOnList}></OCFForm>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={()=>resetFormData()}>Close</Button>
      </Modal.Footer>
    </Modal>
  }

}
