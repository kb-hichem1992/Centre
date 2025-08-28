import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "90%",
      margin: theme.spacing(1),
    },
    "& .MuiButtonBase-root": {
      width: "40%",
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
    padding: theme.spacing(2),
    height: 300,
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

export default function PasseForm(props) {
  const classes = useStyles();

  const {
    NUMERO_FORMATION,
    NUMERO_AGREMENT,
    NUM_INS,
    GROUPE,
    NOTE,
    REMARQUE,
    DATE_INS,
    NUM_PERMIS,
  } = props.values || [];

  const [numeroFormation] = useState(NUMERO_FORMATION);
  const [numeroCandidat] = useState(NUM_INS);
  const [note, setNote] = useState(NOTE);
  const [remarque, setRemarque] = useState(REMARQUE);
  const [groupe] = useState(GROUPE);

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };
  const handleRemarqueChange = (e) => {
    setRemarque(e.target.value);
  };

  const Enregister = () => {
    try {
      if (note === null || remarque === null) {
        alert("يجب ملئ كل المعلومات");
      } else {
        props.onClick(
          remarque,
          note,
          numeroCandidat,
          NUM_PERMIS,
          DATE_INS,
          numeroFormation,
          GROUPE,
          NUMERO_AGREMENT,
        );
        props.Close(false);
      }
    } catch (error) {
      console.log(error);
    }
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
              disabled
              value={groupe}
            />
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Remarque</InputLabel>
              <Select
                labelId="demo-simple-select"
                id="demo-simple-select"
                value={remarque}
                onChange={handleRemarqueChange}
              >
                <MenuItem value={"ناجح"}>ناجح </MenuItem>
                <MenuItem value={"مؤجل للإستدراك"}>مؤجل للإستدراك </MenuItem>
                <MenuItem value={"مؤجل للإمتحان"}>مؤجل للإمتحان </MenuItem>
                <MenuItem value={"راسب"}>راسب</MenuItem>
              </Select>
            </FormControl>
            <TextField
              variant="outlined"
              label="العلامة"
              size="small"
              type="number"
              value={note}
              onChange={handleNoteChange}
              inputProps={{ min: 0, max: 20 }}
            />
            <Button
              variant="contained"
              color="primary"
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
        </form>
      </Paper>
    </Fragment>
  );
}
