import React, { useReducer } from "react";
import Form from "./Form";

const searchReducer = (artState, action) => {
  switch (action.type) {
    case "store-this-art":
      return { ...artState, artIDs: action.payload.artIDs };
    default:
      return { ...artState, query: action };
  }
};

const Upper = (props) => {
  const [artState, ArtDispatcher] = useReducer(searchReducer, {
    artIDs: [],
    query: "",
  });

  const handleInputChange = (searchObj) => {
    ArtDispatcher(searchObj.query);
  };

  const searchThis = async () => {
    try {
      const url = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${artState.query}`;
      console.log(url);
      const res = await fetch(url);
      const data = await res.json();
      //  add data to artState.artIDs
      ArtDispatcher({ type: "store-this-art", payload: { artIDs: data } });
      const tempArr = [];
      //  set first 10 results as setTenResults
      //  temporarily set to 1 result while I work on other components
      for (let i = 0; i < 10; i++) {
        // using data direct from Met server in this function as artDispatcher might not have run yet
        tempArr.push(data.objectIDs[i]);
      }

      props.setTenResults(tempArr);
      //   for (const number of data.objectIDs) {
      //   const oneArt = document.createElement("div");
      //   oneArt.setAttribute("class", "oneArt");
      //   const objectIDDiv = document.createElement("div");
      //   objectIDDiv.innerText = number;
      //   oneArt.append(objectIDDiv);
      //   document.querySelector("#results").append(oneArt);
      // }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="Upper">
      <Form submitInput={searchThis} passInput={handleInputChange} />

      {console.log({ artState })}
    </div>
  );
};

export default Upper;
