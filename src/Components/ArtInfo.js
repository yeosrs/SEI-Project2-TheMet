import React from "react";

const ArtInfo = (props) => {
  return (
    <div className="ArtInfo">
      Title: {props.title} <br />
      Artist: {props.artist} <br />
      Period: {props.period} <br />
      Medium: {props.medium} <br />
      Department: {props.department}
    </div>
  );
};

export default ArtInfo;
