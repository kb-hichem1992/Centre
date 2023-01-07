import React, { useState } from "react";
import { Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DatePicker from "../components/controls/DatePicker";
import AlertDialog from "../components/controls/Dialog";
import axios from "axios";

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

export default function TravailDateForm(props) {
  const classes = useStyles();
  const { state, setstate, setOpenPopup } = props;
  const {
    NUM_INS,
    DATE_INS,
    NUM_PERMIS,
    NUMERO_ENREGISTREMENT,
    DATE_RECRUT,
    DATE_FIN,
  } = props.selectedValue || [];
  const [dateRecrutement, setdateRecrutement] = useState(DATE_RECRUT);
  const [dateFinRecrutement, setdateFinRecrutement] = useState(DATE_FIN);
  const [open, setOpen] = useState(false);

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

  const update_date_travail = () => {
    let relation = "";

    if (dateRecrutement === null) {
      relation = "منتسب";
    } else {
      relation = "";
    }

    let dteRecrut = new Date(dateRecrutement);
    let dtefinRecrut = new Date(dateFinRecrutement);
    if (dteRecrut >= dtefinRecrut) {
      alert("تاريخ نهاية العمل خاطئ");
    } else {
      axios
        .put(process.env.REACT_APP_API_URL + "/Update_travail", {
          DATE_FIN: convert(dateFinRecrutement),
          ETAT: relation,
          numeroEnregistrement: NUMERO_ENREGISTREMENT,
          NUM_INS: NUM_INS,
          DATE_INS: DATE_INS,
          NUM_PERMIS: NUM_PERMIS,
          DATE_RECRUTEMENT: DATE_RECRUT,
        })
        .then(() => {
          setstate(!state);
          alert("تم التعديل");
          setOpenPopup(false);
        });
    }
  };

  return (
    <>
      <div style={{ width: 300, height: 200 }}>
        <form className={classes.root} noValidate autoComplete="off">
          <Grid container spacing={1}>
            <DatePicker
              label="تاريخ بداية العمل"
              value={dateRecrutement}
              onChange={setdateRecrutement}
              disabled={true}
            />
            <DatePicker
              label="تاريخ نهاية العمل"
              value={dateFinRecrutement}
              onChange={setdateFinRecrutement}
              disabled={dateRecrutement === null ? true : false}
            />
            <Button
              variant="contained"
              color="Primary"
              size="small"
              onClick={update_date_travail}
            >
              تأكيد
            </Button>
          </Grid>
        </form>
      </div>
      <AlertDialog
        title="تأكيد"
        message="هل أنت متأكد من القيام بهذه العملية ؟"
        open={open}
        setOpen={setOpen}
        method={() => {
          props.Close(false);
        }}
      />
    </>
  );
}
