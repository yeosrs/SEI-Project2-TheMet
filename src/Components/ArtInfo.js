import React from "react";

const ArtInfo = (props) => {
  return (
    <div className="card">
      <h5 className="card-title">{props.title}</h5>
      <h6 className="card-title">{props.artist} </h6>
      Period: {props.period} <br />
      Date: {props.date} <br />
      {props.medium} <br />
      {props.department}
    </div>
  );
};

export default ArtInfo;
