import React, { Component } from "react";
import { ListGroup,Button } from "react-bootstrap";


export const OCFListGroup = ({ agenda, deleteMeeting, editMeeting }) => {
  return (
    <div>
      {agenda.map((days, index) => {
        const agendaIndex = index;
        return (
          <div key={days.date} style={styles.agendaListContainer}>
            <h2>{days.date} </h2>
            <ListGroup defaultActiveKey="#link1">
              {days.meetings.map((meeting, index) => {

                return (

                  <ListGroup.Item style={styles.listGroup}
                    key={"meeting" + index}


                  >
                    <p>{meeting.label}</p>
                    <p>{meeting.startHour}</p>
                      <Button variant="primary" onClick={() => editMeeting({...meeting, date: days.date},{iAgenda:agendaIndex,iMeeting:index})}>
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
