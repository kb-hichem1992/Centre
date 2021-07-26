import React, { useState, useEffect, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./AppOp.css";
import TableOp from "./TableOp.js";

require("es6-promise").polyfill();
require("isomorphic-fetch");
function AppOp({id, Title}) {
  const [data, setdata] = useState([]);
  useEffect(() => {
    fetch(id)
      .then((response) => response.json())
      .then((json) => setdata(json));
  }, [id, setdata ]);
  const useStyles = makeStyles((theme) => ({
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    root: {
      ...theme.typography.button,
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(1),
    },
    formControl: {
      display: "inline-flex",
      margin: theme.spacing(2),
      minWidth: 170,
    },
    container: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      display: "flex",
      justifyContent: "space-between",
    },
  }));  
  const classes = useStyles();
  return (
    <Fragment>
     <div className = {classes.root}>{Title}</div>
      <div className={classes.container}>
        <TableOp data={data} />
      </div>
    </Fragment>
  );
}
export default AppOp;
