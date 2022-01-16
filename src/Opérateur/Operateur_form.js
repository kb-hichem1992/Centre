import { TextField, Paper, makeStyles, Button } from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import Controls from "../components/controls/Controls";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "100%",
      margin: theme.spacing(1),
    },
    "& .MuiButtonBase-root": {
      width: "42%",
      margin: theme.spacing(1),
    },
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  pageContent: {
    margin: theme.spacing(0),
    padding: theme.spacing(1),
    height: "auto",
    width: 300,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function OperateurForm(props) {
  const { setEtat, etat, Values } = props;
  const tempo = [];
  const {
    NOM_OP,
    SIEGE_OP,
    PROPRIETAIRE,
    WILAYA,
    NUMERO_ENREGISTREMENT,
    DATE_ENREGISTREMENT,
  } = Values || tempo;
  const classes = useStyles();
  const [numeroEnregistrement, setNumeroEnregistrement] = useState(
    NUMERO_ENREGISTREMENT
  );
  const [nomOperateur, setNomOperateur] = useState(NOM_OP);
  const [siege, setSiege] = useState(SIEGE_OP);
  const [propriétaire, setPropriétaire] = useState(PROPRIETAIRE);
  const [wilaya, setWilaya] = useState(WILAYA);
  const [date_Enregistrement, setdate_Enregistrement] = useState(
    convert(DATE_ENREGISTREMENT)
  );

  const add = (
    numeroEnregistrement,
    nomOperateur,
    siege,
    propriétaire,
    wilaya,
    date_Enregistrement
  ) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/Add_operateur`, {
        nomOperateur: nomOperateur,
        siege: siege,
        propriétaire: propriétaire,
        wilaya: wilaya,
        numeroEnregistrement: numeroEnregistrement,
        date_Enregistrement: date_Enregistrement,
      })
      .then(() => {
        setEtat(!etat);
      });
  };
  const update = (
    numeroEnregistrement,
    nomOperateur,
    siege,
    propriétaire,
    wilaya,
    date_Enregistrement
  ) => {
    axios
      .put(`${process.env.REACT_APP_API_URL}/Update_operateur`, {
        nomOperateur: nomOperateur,
        siege: siege,
        propriétaire: propriétaire,
        wilaya: wilaya,
        date_Enregistrement: date_Enregistrement,
        numeroEnregistrement: numeroEnregistrement,
      })
      .then(() => {
        setEtat(!etat);
      });
  };

  function convert(date) {
    const current_datetime = new Date(date);
    const m = current_datetime.getMonth() + 1;
    if (m > 9) {
      return (
        current_datetime.getFullYear() +
        "-" +
        m +
        "-" +
        current_datetime.getDate()
      );
    } else {
      return (
        current_datetime.getFullYear() +
        "-" +
        0 +
        m +
        "-" +
        current_datetime.getDate()
      );
    }
  }

  return (
    <div>
      <Paper className={classes.pageContent}>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            variant="outlined"
            label="رقم القيد"
            value={numeroEnregistrement}
            size="small"
            onChange={(e) => setNumeroEnregistrement(e.target.value)}
          />
          <Controls.DatePicker
            label="تاريخ القيد"
            value={date_Enregistrement}
            onChange={setdate_Enregistrement}
          />
          <TextField
            variant="outlined"
            label="إسم المتعامل"
            value={nomOperateur}
            size="small"
            onChange={(e) => setNomOperateur(e.target.value)}
          />
          <TextField
            variant="outlined"
            label="المقر"
            value={siege}
            size="small"
            onChange={(e) => setSiege(e.target.value)}
          />
          <TextField
            variant="outlined"
            label="المالك"
            value={propriétaire}
            size="small"
            onChange={(e) => setPropriétaire(e.target.value)}
          />
          <TextField
            variant="outlined"
            label="الولاية"
            value={wilaya}
            size="small"
            onChange={(e) => setWilaya(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => {
              if (props.type === "add") {
                add(
                  numeroEnregistrement,
                  nomOperateur,
                  siege,
                  propriétaire,
                  wilaya,
                  convert(date_Enregistrement)
                );
                props.Close(false);
              }
              if (props.type === "update") {
                update(
                  numeroEnregistrement,
                  nomOperateur,
                  siege,
                  propriétaire,
                  wilaya,
                  convert(date_Enregistrement)
                );
                props.Close(false);
              }
            }}
          >
            تأكيد
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => {
              props.Close(false);
            }}
          >
            إلغاء
          </Button>
        </form>
      </Paper>
    </div>
  );
}
