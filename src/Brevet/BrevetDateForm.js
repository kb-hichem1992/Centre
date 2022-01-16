import { Button, Grid, makeStyles, TextField } from "@material-ui/core";
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

export default function BrevetDateForm(props) {
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
    LIV_BREVET,
    EXP_BREVET,
    DATE_EMISSION,
  } = props.values || tempo;

  const [Brevet, setBrevet] = useState(BREVET);
  const [open, setOpen] = useState(false);
  const [LivBrevt, setLivBrevt] = useState(LIV_BREVET || null);
  const [ExpBrevet, setExpBrevet] = useState(EXP_BREVET || null);
  const [Emission, setEmission] = useState(DATE_EMISSION || null);

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
  const insertDateBrevet = (
    LivBrevt,
    ExpBrevet,
    Emission,
    numeroCandidat,
    Date_ins,
    Num_permis,
    numeroFormation,
    numeroAgrement,
    GROUPE,
    NumeroBrevet
  ) => {
    axios
      .put(process.env.REACT_APP_API_URL +"/insert_Date_brevet", {
        LivBrevt: LivBrevt,
        ExpBrevet: ExpBrevet,
        Emission: Emission,
        numeroCandidat: numeroCandidat,
        Date_ins: Date_ins,
        Num_permis: Num_permis,
        numeroFormation: numeroFormation,
        numeroAgrement: numeroAgrement,
        GROUPE: GROUPE,
        NumeroBrevet: NumeroBrevet,
      })
      .then(() => {
        props.setEtat(!props.etat);
      });
  };
  const Enregister = () => {
    try {
      if (LivBrevt >= ExpBrevet) {
        alert("تاريخ إصدار الشهادة خاطئ");
      } else {
        setOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div style={{width : 300 , height : 320}}  >
        <form className={classes.root} noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                label="رقم الشهادة"
                value={Brevet}
                size="small"
                disabled
                className={classes.textField}
                onChange={(e) => setBrevet(e.target.value)}
              />
              <Controls.DatePicker
                label="تاريخ التسليم"
                value={Emission}
                onChange={setEmission}
              />
              <Controls.DatePicker
                label="تاريخ بداية الصلاحية"
                value={LivBrevt}
                onChange={setLivBrevt}
              />
              <Controls.DatePicker
                label="تاريخ نهاية الصلاحية"
                value={ExpBrevet}
                onChange={setExpBrevet}
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
      </div>
      <Controls.AlertDialog
        title="تأكيد"
        message="هل أنت متأكد من القيام بهذه العملية ؟"
        open={open}
        setOpen={setOpen}
        method={() => {
          if (Emission === null) {
            insertDateBrevet(
              convert(LivBrevt),
              convert(ExpBrevet),
              null,
              NUM_INS,
              convert(DATE_INS),
              NUM_PERMIS,
              NUMERO_FORMATION,
              NUMERO_AGREMENT,
              GROUPE,
              Brevet
            );
          } else {
            insertDateBrevet(
              convert(LivBrevt),
              convert(ExpBrevet),
              convert(Emission),
              NUM_INS,
              convert(DATE_INS),
              NUM_PERMIS,
              NUMERO_FORMATION,
              NUMERO_AGREMENT,
              GROUPE,
              Brevet
            );
          }

          props.Close(false);
        }}
      />
    </>
  );
}
