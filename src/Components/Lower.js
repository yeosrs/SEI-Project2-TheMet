import React from "react";
import ArtResult from "./ArtResult";

const Lower = (props) => {
  const results = props.results;
  let display = results.map((ele, index) => {
    return <ArtResult display={ele} key={index} />;
  });

  return <div className="Lower">{display}</div>;
};

export default Lower;
