import React, { useState, useEffect, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./AppVeh.css";
import TableVehM from "./TableVehM.js";
import TableVehV from "./TableVehV.js";

require("es6-promise").polyfill();
require("isomorphic-fetch");
function AppVeh(id, id2) {
  const [data, setdata] = useState([]);
  const [data2, setdata2] = useState([]);
  useEffect(() => {
    fetch(id)
      .then((response) => response.json())
      .then((json) => setdata(json));
  }, [id ,setdata]);
  useEffect(() => {
    fetch(id2)
      .then((response) => response.json())
      .then((json) => setdata2(json));
  }, [id2, setdata2]);
  const useStyles = makeStyles((theme) => ({
    root: {
      ...theme.typography.button,
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(1),
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
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
      <div className={classes.root}> Liste des Formations</div>
      <div className={classes.container}>
        <TableVehM data={data} />
      </div>
      <div className={classes.container}>
        <TableVehV data={data2} />
      </div>
    </Fragment>
  );
}
export default AppVeh;
