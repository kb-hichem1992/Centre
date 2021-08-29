import {
  Button,
  Grid,
  makeStyles,
  Snackbar,
  TextField,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import React, { useState } from "react";
import AlertDialog from "../components/controls/Dialog";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "100%",
      margin: theme.spacing(1),
    },
    "& .MuiButtonBase-root": {
      width: "100%",
      margin: theme.spacing(1),
    },
  },
  group: {
    width: "auto",
    height: "auto",
    display: "flex",
    flexWrap: "nowrap",
    flexDirection: "row",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 90,
  },
  pageContent: {
    margin: theme.spacing(0),
    padding: theme.spacing(1),
    width: "auto",
    height: "auto",
  },
}));

export default function BrevetForm(props) {
  const classes = useStyles();
  const tempo = [];
  const {
    NUMERO_FORMATION,
    NUMERO_AGREMENT,
    DATE_INS,
    NUM_PERMIS,
    NUM_INS,
    GROUPE,
    BREVET,
    PRINT,
  } = props.values || tempo;

  const [Brevet, setBrevet] = useState(BREVET);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);

  const setPrinted = (
    numeroCandidat,
    Num_permis,
    dateins,
    numeroFormation,
    GROUPE,
    numeroAgrement
  ) => {
    axios
      .put("http://localhost:3001/Printed", {
        numeroCandidat: numeroCandidat,
        Num_permis: Num_permis,
        dateins: dateins,
        numeroFormation: numeroFormation,
        GROUPE: GROUPE,
        numeroAgrement: numeroAgrement,
      })
      .then(() => {
        console.log("");
      });
  };
  const handleClick = () => {
    setOpenSnack(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
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

  function BrevetExist(id) {
    return props.data.some(function (el) {
      if (el.BREVET === id) {
        return true;
      } else {
        return false;
      }
    });
  }

  const Enregister = () => {
    try {
      if (BrevetExist(Brevet) === true && Brevet !== "") {
        alert("رقم الشهادة مسجل من قبل");
      } else if (PRINT === 0) {
        setOpen(true);
      } else {
        setOpen2(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form className={classes.root} noValidate autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              label="رقم الشهادة"
              value={Brevet}
              size="small"
              className={classes.textField}
              onChange={(e) => setBrevet(e.target.value)}
            />
            <Button
              variant="contained"
              color="Primary"
              size="small"
              onClick={Enregister}
            >
              تأكيد
            </Button>
          </Grid>
        </Grid>
      </form>

      <AlertDialog
        title="تأكيد"
        message="هل أنت متأكد من القيام بهذه العملية ؟"
        open={open}
        setOpen={setOpen}
        method={() => {
          props.onClick(
            Brevet,
            NUM_INS,
            convert(DATE_INS),
            NUM_PERMIS,
            NUMERO_FORMATION,
            NUMERO_AGREMENT,
            GROUPE
          );
          window.open(
            "http://localhost:3001/report/DIPLOME/" +
              NUM_INS +
              "/" +
              NUMERO_FORMATION +
              "/" +
              DATE_INS +
              "/" +
              NUMERO_AGREMENT +
              "/" +
              GROUPE +
              ""
          );
          setPrinted(
            NUM_INS,
            NUM_PERMIS,
            DATE_INS,
            NUMERO_FORMATION,
            GROUPE,
            NUMERO_AGREMENT
          );
          handleClick();
          props.Close(false);
        }}
      />
      <AlertDialog
        title="تنبيه"
        message="هذه الشهادة قد طبعت من قبل. هل تود طباعتها من جديد؟"
        open={open2}
        setOpen={setOpen2}
        method={() => {
          props.onClick(
            Brevet,
            NUM_INS,
            convert(DATE_INS),
            NUM_PERMIS,
            NUMERO_FORMATION,
            NUMERO_AGREMENT,
            GROUPE
          );
          window.open(
            "http://localhost:3001/report/DIPLOME/" +
              NUM_INS +
              "/" +
              NUMERO_FORMATION +
              "/" +
              DATE_INS +
              "/" +
              NUMERO_AGREMENT +
              "/" +
              GROUPE +
              ""
          );
          props.Close(false);
        }}
      />
      <div className={classes.root}>
        <Snackbar
          open={openSnack}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="info">
            طبعت لأول مرة
          </Alert>
        </Snackbar>
      </div>
    </>
  );
}
