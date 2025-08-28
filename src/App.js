import React, { useState, useMemo, useEffect } from "react";
import { UserContext } from "./Utils/UserContext";
import LoginForm from "./Authentication/Login_Form";
import Dashboard from "./Dashboards/Dashboard.js";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import DashboardFormation from "./Dashboards/DashboardFormation";
import DashboardMarchandise from "./Dashboards/DashboardMarchandise";
import axios from "./Utils/setupAxios";
require("es6-promise").polyfill();
require("isomorphic-fetch");

function App() {
  const [state, setstate] = useState(false);
  const [userData, setuserData] = useState([]);
  const [side, setSide] = useState(localStorage.getItem("side") || "");
  const [authChecked, setAuthChecked] = useState(false);
  const [hasToken, setHasToken] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedSide = localStorage.getItem("side");
    
    if (!token) {
      setAuthChecked(true);
      setHasToken(false);
      setSide("");
      return;
    }
    
    if (storedSide) {
      setSide(storedSide);
    }
    
    axios
      .get("/auth/me")
      .then((res) => {
        if (res && res.data && res.data.user) {
          setuserData(res.data.user);
          setHasToken(true);
        } else {
          setHasToken(false);
          setSide("");
          localStorage.removeItem("token");
          localStorage.removeItem("side");
        }
      })
      .catch(() => {
        setHasToken(false);
        setSide("");
        localStorage.removeItem("token");
        localStorage.removeItem("side");
      })
      .finally(() => setAuthChecked(true));
  }, []);

  const value = useMemo(
    () => ({
      state,
      setstate,
      userData
    }),
    [state, userData]
  );

  if (!authChecked) {
    return null; // or a loader
  }

  return (
    <BrowserRouter>
      <Route
        exact
        path="/signIn"
        render={() => (
          <LoginForm
            setUser={setuserData}
            user={userData}
            setSide={setSide}
          />
        )}
      />
      <Route
        exact
        path="/"
        render={() => (
          <LoginForm
            setUser={setuserData}
            user={userData}
            setSide={setSide}
          />
        )}
      />
      <UserContext.Provider value={value}>
        <Route
          path="/Center"
          render={(props) =>
            hasToken && side === "مركز" ? (
              <Dashboard />
            ) : (
              <Redirect to="/signIn" />
            )
          }
        />
        <Route
          path="/formation"
          render={(props) =>
            hasToken && side === "formation" ? (
              <DashboardFormation />
            ) : (
              <Redirect to="/signIn" />
            )
          }
        />
        <Route
          path="/marchandise"
          render={(props) =>
            hasToken && side === "marchandise" ? (
              <DashboardMarchandise />
            ) : (
              <Redirect to="/signIn" />
            )
          }
        />
      </UserContext.Provider>
    </BrowserRouter>
  );
}
export default App;
