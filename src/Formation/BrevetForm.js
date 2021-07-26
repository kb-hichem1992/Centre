import { Button, Grid, makeStyles, Paper, TextField } from "@material-ui/core";
import React, { useState } from "react";
import Controls from "../components/controls/Controls";


const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "100%",
      margin: theme.spacing(1),
    },
    "& .MuiButtonBase-root": {
      width: "44%",
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
    width: 200,
  },
  pageContent: {
    margin: theme.spacing(0),
    padding: theme.spacing(1),
    width: 300,
    height: "auto",
  },
}));
export default function BrevetForm(props) {
  const classes = useStyles();
  const {
    NUMERO_FORMATION,
    NUMERO_AGREMENT,
    DATE_INS,
    NUM_PERMIS,
    NUM_INS,
    GROUPE,
    BREVET,
  } = props.values;

  const [Brevet, setBrevet] = useState(BREVET);
  const [LivBrevt, setLivBrevt] = useState(new Date());
  const [ExpBrevet, setExpBrevet] = useState(new Date());
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
      if (Brevet === "" || LivBrevt === "" || ExpBrevet === "") {
        alert("يجب ملئ كل المعلومات");
      } else if (BrevetExist(Brevet) === true && Brevet !== "") {
        alert("رقم الشهادة مسجل من قبل");
      } else {
        setOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Paper className={classes.pageContent}>
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
              <Controls.DatePicker
                label="تاريخ الإصدار"
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
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Controls.AlertDialog
        title="تأكيد"
        message="هل أنت متأكد من القيام بهذه العملية ؟"
        open={open}
        setOpen={setOpen}
        method={() => {
          props.onClick(
            Brevet,
            convert(LivBrevt),
            convert(ExpBrevet),
            NUM_INS,
            convert(DATE_INS),
            NUM_PERMIS,
            NUMERO_FORMATION,
            NUMERO_AGREMENT,
            GROUPE
          );
          props.Close(false);
        }}
      />
    </>
  );
}
