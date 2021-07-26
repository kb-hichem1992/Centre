import React, { useState, useMemo } from "react";

import { UserContext } from "./UserContext";
import LoginForm from "./Login_Form";
import Dashboard from "./Dashboard.js";
require("es6-promise").polyfill();
require("isomorphic-fetch");

function App() {
  const [state, setstate] = useState(false);
  const [userData, setuserData] = useState([]);



  const value = useMemo(
    () => ({ state, setstate, userData, setuserData }),
    [state, setstate, userData, setuserData]
  );

  if (state === false) {
    return (
      <LoginForm setstate={setstate} setUser={setuserData} user={userData} />
    );
  } else {
    return (
      <UserContext.Provider value={value}>
        <Dashboard />
      </UserContext.Provider>
    );
  }
}
export default App;
