import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, Paper, TextField } from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "90%",
      margin: theme.spacing(1),
    },
    "& .MuiButtonBase-root": {
      width: "90%",
      margin: theme.spacing(1),
    },
  },
  pageContent: {
    margin: theme.spacing(0),
    padding: theme.spacing(2),
    height: 130,
    width: 150,
  },
}));

export default function GroupeForm(props) {
  const classes = useStyles();

  const {
    NUMERO,
    NUMERO_FORMATION,
    NUMERO_AGREMENT,
    NUM_INS,
    GROUPE,
    DATE_INS,
    NUM_PERMIS,
  } = props.values || [];

  const [numero, setNumero] = useState(NUMERO);

  const updateNumeroGroupe = (
    number,
    numeroFormation,
    numeroAgrement,
    numeroCandidat,
    GROUPE,
    dateins,
    Num_permis
  ) => {
    axios
      .put(process.env.REACT_APP_API_URL +"/update_groupe_number", {
        number: number,
        numeroCandidat: numeroCandidat,
        Num_permis: Num_permis,
        dateins: dateins,
        numeroFormation: numeroFormation,
        GROUPE: GROUPE,
        numeroAgrement: numeroAgrement,
      })
      .then(() => {
        props.setEtat(!props.etat);
      });
  };
  return (
    <Fragment>
      <Paper className={classes.pageContent}>
        <form className={classes.root} autoComplete="off">
          <Grid container spacing={2}>
            <TextField
              variant="outlined"
              label="الفوج"
              size="small"
              type="number"
              value={numero}
              inputProps={{ min: 0, max: 15 }}
              onChange={(e) => {
                setNumero(e.target.value);
              }}
            />
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => {
                updateNumeroGroupe(numero, NUMERO_FORMATION,NUMERO_AGREMENT,NUM_INS,GROUPE,DATE_INS,NUM_PERMIS);
                props.close(false)
              }}
            >
              تأكيد
            </Button>
          </Grid>
        </form>
      </Paper>
    </Fragment>
  );
}
