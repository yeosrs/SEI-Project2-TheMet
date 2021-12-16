import React, { useState } from "react";
import Upper from "./Components/Upper";
import Lower from "./Components/Lower";
// import { Route } from "react-router-dom";
// import AboutTheMet from "./Components/AboutTheMet";

function App() {
  const [tenResults, setTenResults] = useState([]);

  return (
    <>
      {/* <Route exact path="/"> */}
      <Upper setTenResults={setTenResults} />
      <Lower results={tenResults} />
      {/* </Route>
      <Route path="/about-the-met">
        <AboutTheMet />
      </Route> */}
    </>
  );
}

export default App;
