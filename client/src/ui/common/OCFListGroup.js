import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";


export const OCFListGroup = ({ agenda, deleteMeeting }) => {

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
                    action
                    onClick={() =>  deleteMeeting(agendaIndex,index)}
                  >
                    <p>{meeting.label}</p>
                    <p>{meeting.startHour}</p>
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
