import React, { useState, useMemo } from "react";
import { UserContext } from "./UserContext";
import LoginForm from "./Login_Form";
import Dashboard from "./Dashboard.js";
import { useLocalStorage } from "./useLocalStorage";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import DashboardFormation from "./DashboardFormation";
import DashboardMarchandise from "./DashboardMarchandise";
require("es6-promise").polyfill();
require("isomorphic-fetch");

//const LoginForm = React.lazy(() => import("./Login_Form"));
//const Dashboard = React.lazy(() => import("./Dashboard.js"));

function App() {
  const [state, setstate] = useState(false);
  const [userData, setuserData] = useState([]);
  const [isLogedIn, setisLogedIn] = useLocalStorage("isLoggedIn");
  const [side, setSide] = useLocalStorage("side");

  const value = useMemo(
    () => ({
      isLogedIn,
      setisLogedIn,
      state,
      setstate,
      userData
    }),
    [isLogedIn, setisLogedIn, state, userData]
  );

  // useEffect(() => {
  //   axios.get("http://localhost:3001/login").then((response) => {
  //     setisLogedIn(response.data.loggedIn);
  //     setuserData(response.data[0]);
  //     console.log(userData);
  //   });
  // }, [userData]);
  // eslint-disable-next-line no-lone-blocks
  {
    /* {isLogedIn === true && side === "مركز" && (
        <UserContext.Provider value={value}>
          <Dashboard setisLogedIn={setisLogedIn} />{" "}
        </UserContext.Provider>
      )}
      {isLogedIn === true && side === "المديرية" && (
        <UserContext.Provider value={value}>
          {" "}
          <DashboardService setisLogedIn={setisLogedIn} />{" "}
        </UserContext.Provider>
      )}
      {isLogedIn === false && (
        <LoginForm
          setisLogedIn={setisLogedIn}
          setUser={setuserData}
          user={userData}
          setSide={setSide}
        />
      )} */
  }
  return (
    <BrowserRouter>
      <Route
        exact
        path="/signIn"
        render={() => (
          <LoginForm
            setisLogedIn={setisLogedIn}
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
            setisLogedIn={setisLogedIn}
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
            isLogedIn && side === "مركز" ? (
              <Dashboard setisLogedIn={setisLogedIn} />
            ) : (
              <Redirect to="/signIn" />
            )
          }
        />
        <Route
          path="/formation"
          render={(props) =>
            isLogedIn && side === "formation" ? (
              <DashboardFormation setisLogedIn={setisLogedIn} />
            ) : (
              <Redirect to="/signIn" />
            )
          }
        />
        <Route
          path="/marchandise"
          render={(props) =>
            isLogedIn && side === "marchandise" ? (
              <DashboardMarchandise setisLogedIn={setisLogedIn} />
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
