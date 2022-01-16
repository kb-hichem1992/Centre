import React, { Fragment, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Controls from "../components/controls/Controls";
import AlertDialog from "../components/controls/Dialog";

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

export default function Form(props) {
  const classes = useStyles();

  const {
    NUMERO_FORMATION,
    NUMERO_AGREMENT,
    GROUPE,
    TYPE_FORMATION,
    DEBUT,
    FIN,
    TYPE_GROUPE,
  } = props.values;

  const [data, setdata] = useState([]);
  const [numeroFormation, setnumeroFormation] = useState(NUMERO_FORMATION);
  const [numeroAgrement] = useState(NUMERO_AGREMENT);
  const [typeFormation, setTypeFormation] = useState(TYPE_FORMATION);
  const [debut, setDebut] = useState(DEBUT);
  const [fin, setFin] = useState(FIN);
  const [open, setOpen] = useState(false);
  const [groupe, setGroupe] = useState(GROUPE);
  const [type_groupe, setType_groupe] = useState(TYPE_GROUPE);

  const handleTypeChange = (e) => {
    setTypeFormation(e.target.value);
  };
  const handleTypeGroupe = (e) => {
    setType_groupe(e.target.value);
  };
  const handleGroupeChange = (e) => {
    setGroupe(e.target.value);
  };

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "/api/get_form")
      .then((response) => response.json())
      .then((json) => setdata(json));
  }, []);
  // convertir le format de la Date en yyyy-mm-dd
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

  const exist = () => {
    return data.some(function (el) {
      if (
        el.NUMERO_FORMATION === Number(numeroFormation) &&
        el.GROUPE === Number(groupe) &&
        el.NUMERO_AGREMENT === Number(numeroAgrement)
      ) {
        return true;
      } else {
        return false;
      }
    });
  };

  const add = () => {
    const dt1 = new Date(debut);
    const dt2 = new Date(fin);
    if (typeFormation === "" || debut === "" || fin === "") {
      alert("يرجى ملئ جميع المعلومات");
    } else {
      if (dt1 >= dt2) {
        alert("تاريخ بداية الدورة خاطئ ");
      } else if (exist(numeroFormation, numeroAgrement, groupe)) {
        alert(" مسجلة من قبل");
      } else {
        setOpen(true);
      }
    }
  };

  const update = () => {
    const dt1 = new Date(debut);
    const dt2 = new Date(fin);
    if (typeFormation === "" || debut === "" || fin === "") {
      alert("يرجى ملئ جميع المعلومات");
    } else {
      if (dt1 >= dt2) {
        alert("تاريخ بداية الدورة خاطئ ");
      } else {
        setOpen(true);
      }
    }
  };

  return (
    <Fragment>
      <Paper className={classes.pageContent}>
        <form className={classes.root} noValidate autoComplete="off">
          <Grid container spacing={2}>
            <TextField
              variant="outlined"
              label="رقم الدورة"
              type="number"
              inputProps={{ min: 1, max: 20 }}
              value={numeroFormation}
              size="small"
              onChange={(e) => setnumeroFormation(e.target.value)}
            />
            <TextField
              variant="outlined"
              label="رقم المركز"
              value={numeroAgrement}
              size="small"
              type="number"
              disabled
            />
            <TextField
              variant="outlined"
              label="رقم الفوج "
              size="small"
              type="number"
              inputProps={{ min: 1, max: 6 }}
              value={groupe}
              onChange={handleGroupeChange}
            />
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">نوع الفوج</InputLabel>
              <Select
                labelId="demo-simple-select"
                id="demo-simple-select"
                value={type_groupe}
                onChange={handleTypeGroupe}
              >
                <MenuItem value={"فوج عادي"}> فوج عادي</MenuItem>
                <MenuItem value={"مؤجل للإمتحان"}> مؤجل للإمتحان</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">نوع التكوين</InputLabel>
              <Select
                labelId="demo-simple-select"
                id="demo-simple-select"
                value={typeFormation}
                onChange={handleTypeChange}
              >
                <MenuItem value={"نقل البضائع"}>نقل البضائع</MenuItem>
                <MenuItem value={"نقل المسافرين"}>نقل المسافرين</MenuItem>
                <MenuItem value={"نفل المواد الخطيرة"}>
                  نفل المواد الخطيرة
                </MenuItem>
              </Select>
            </FormControl>
            <Controls.DatePicker
              label="تاريخ البداية"
              value={debut}
              onChange={setDebut}
            />
            <Controls.DatePicker
              label="تاريخ النهاية"
              value={fin}
              onChange={setFin}
            />
            <Controls.Button
              text="تأكيد"
              variant="contained"
              color="primary"
              size="small"
              onClick={() => {
                try {
                  if (props.type === "add") {
                    add();
                  }
                  if (props.type === "update") {
                    update();
                  }
                } catch (err) {
                  console.log(err);
                }
              }}
            />

            <Controls.Button
              text="إلغاء"
              variant="contained"
              color="secondary"
              size="small"
              onClick={() => {
                try {
                  props.Close(false);
                } catch (error) {
                  alert(error);
                }
              }}
            />
          </Grid>
        </form>
      </Paper>
      <AlertDialog
        title="تأكيد"
        message=" هل انت متأكد ؟"
        open={open}
        setOpen={setOpen}
        method={() => {
          props.execute(
            numeroFormation,
            numeroAgrement,
            groupe,
            typeFormation,
            convert(debut),
            convert(fin),
            type_groupe
          );
          props.Close(false);
        }}
      />
    </Fragment>
  );
}
