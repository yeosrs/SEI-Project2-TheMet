import React from "react";
import Button from "./Button";
import Input from "./Input";



const Form = (props) => {


  const handleClick = (event) => {
    event.preventDefault();
    // const search = artState.query;
    props.submitInput();
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    props.passInput({ [name]: value });
  };

  return (
    <form className="container" onSubmit={handleClick}>
      <Input name="query" input={handleInput} />
      <Button onClick={handleClick} text="Search" />
    </form>
  );
};

export default Form;
