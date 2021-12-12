import React, { useState } from "react";
import Upper from "./Components/Upper";
import Lower from "./Components/Lower";
// import ResultsContext from "./context/results-context";
function App() {
  const [tenResults, setTenResults] = useState([]);

  return (
    <div>
      <h2>The Met</h2>
      {/* <ResultsContext.Provider value={tenResults}> */}
      <Upper setTenResults={setTenResults}/>
      <Lower results={tenResults}/>
      {/* </ResultsContext.Provider> */}
      {console.log({tenResults})}
    </div>
  );
}

export default App;
