import React, { Component } from "react";
import { ListGroup,Button } from "react-bootstrap";


export const OCFListGroup = ({ agenda, deleteMeeting, editMeeting }) => {
  console.log("%c agenda in lit Component","background:cyan", agenda)
  return (
    <div>
      {agenda.map((meetings, index) => {
        const agendaIndex = index;
        return (
          <div key={meetings.date} style={styles.agendaListContainer}>
            <h2>{meetings.date} </h2>
            <ListGroup defaultActiveKey="#link1">
              {meetings.meetings.map((meeting, index,meetings) => {

                return (

                  <ListGroup.Item style={styles.listGroup}
                    key={"meeting" + index}
                    

                  >
                    <p>{meeting.label}</p>
                    <p>{meeting.startHour}</p>
                      <Button variant="primary" onClick={() => editMeeting(meeting)}>
                        Edit
                      </Button>
                      <Button variant="danger" onClick={() =>  deleteMeeting(agendaIndex,index)}>
                        Delete
                      </Button>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </div>
        );
      })}
    </div>
  );
};


const styles = {
  agendaListContainer: {
    textAlign: "center"
  },
  listGroup : {
    width: "380px"
  }
}

// onClick={() =>  deleteMeeting(agendaIndex,index)}
