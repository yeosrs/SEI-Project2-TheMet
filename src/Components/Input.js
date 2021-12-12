import React from "react";

const Input = (props) => {
  return (
    <>
      <input type="text" onChange={props.input} name={props.name}></input>
    </>
  );
};

export default Input;
