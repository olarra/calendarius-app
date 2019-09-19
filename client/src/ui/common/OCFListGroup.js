import React, { Component } from "react";
import { ListGroup,Button } from "react-bootstrap";
import { sortBy } from 'underscore'

export const OCFListGroup = ({ agenda, deleteMeeting, editMeeting }) => {
  return (
    <div style={{marginTop:80}}>
      {agenda.map((days, index) => {
        const agendaIndex = index;
        return (
          <div key={days.date} style={styles.agendaListContainer}>
          <div style={styles.headerContainer}>
            <span style={{color : "#ffffff", paddingLeft: 20}}>Date : {days.date}</span>
          </div>
            <ListGroup defaultActiveKey="#link1">
              {sortBy(days.meetings,'label').map((meeting, index) => {
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
  headerContainer: {
    background: "linear-gradient(to bottom, #673ab7, #512da8)",
    width: "100%",
    height: 40,
    display: "flex",
    alignItems: "center"
  },
  listGroup : {
    width: "500px"
  }
}

// onClick={() =>  deleteMeeting(agendaIndex,index)}
