import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";

const alertClicked = item => {
  console.log("You clicked the => ", item);
};

export const OCFListGroup = ({ agenda }) => {
  return (
    <div>
      {agenda.map((meetings, index) => {
        return (
          <div key={meetings.date}>
            <h2>{meetings.date}</h2>
            <ListGroup defaultActiveKey="#link1">
              {meetings.meetings.map((meeting, index) => {
                return (
                  <ListGroup.Item
                    key={"meeting" + index}
                    action
                    onClick={() => alertClicked(meeting.label)}
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
