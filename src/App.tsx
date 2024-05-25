// import { useState,useEffect } from 'react'
import { BrowserRouter as Router } from "react-router-dom";
import Pages from "./routes/pages";


function App() {
  return (
    <>
      <Router>
        <Pages/>
      </Router>
    </>
  );
}

export default App;
