import React, { useState } from "react";
import Upper from "./Components/Upper";
import Lower from "./Components/Lower";

function App() {
  const [tenResults, setTenResults] = useState([]);

  return (
    <div>
      <h2 className="text-center">The Met</h2>
      <Upper setTenResults={setTenResults}/>
      <Lower results={tenResults}/>
    </div>
  );
}

export default App;
