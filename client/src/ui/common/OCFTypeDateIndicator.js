import React from 'react';

export const OCFTypeDateIndicator = ({ color, label }) =>  {
  const bg = {background : color}
  return (
    <div style={{ display: "flex" }}>
      <div style={{ ...bg, height: 23, width: 23 }}></div>
      <div style={{ height: 23, width: 23, marginLeft: "9px" }}>
        <span>{label}</span>
      </div>
    </div>
  )
};
