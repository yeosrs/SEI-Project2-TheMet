import React, { useState } from "react";
import Upper from "./Components/Upper";
import Lower from "./Components/Lower";
// import Navbar from "./Components/Navbar";

function App() {
  const [tenResults, setTenResults] = useState([]);

  return (
    <>
      {/* <Navbar/> */}
      <Upper setTenResults={setTenResults}/>
      <Lower results={tenResults}/>
    </>
  );
}

export default App;
