import React, { useState } from "react";
import Upper from "./Components/Upper";
import Lower from "./Components/Lower";
import "./styles.css"

function App() {
  const [tenResults, setTenResults] = useState([]);

  return (
    <div>
      <h2>The Met</h2>
      <Upper setTenResults={setTenResults}/>
      <Lower results={tenResults}/>
      {console.log({tenResults})}
    </div>
  );
}

export default App;
