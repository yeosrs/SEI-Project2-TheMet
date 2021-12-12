import React from "react";
import Button from "./Button";
import Input from "./Input";

// const searchReducer = (artState, action) => {
//   switch (action.type) {
//     default:
//       return { ...artState, query: action.query };
//   }
// };

const Form = (props) => {
  // const [input, setInput] = useState({ searchTerm: "" });

  // const [artState, ArtDispatcher] = useReducer(searchReducer, {
  //   artIDs: [],
  //   query: "",
  // });

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
