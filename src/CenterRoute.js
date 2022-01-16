import React from "react";
import { Redirect, Route } from "react-router-dom";

function CenterRoute({ component: Component, ...restOfProps }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const side = localStorage.getItem("side");

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isLoggedIn && side === "مركز" ? (
          <Component {...props} />
        ) : (
          <Redirect to="/signin" />
        )
      }
    />
  );
}

export default CenterRoute;
