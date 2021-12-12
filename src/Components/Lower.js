import React from "react";
import ArtResult from "./ArtResult";

const Lower = (props) => {
  const results = props.results;
  let display = results.map((ele, index) => {
    return (
      //   <div key={index}>
      //     <div>{ele}</div>
      //   </div>
      ele
    );
  });

  return (
    <div className="Lower">
      <ArtResult  display={display} />
    </div>
  );
};

export default Lower;
