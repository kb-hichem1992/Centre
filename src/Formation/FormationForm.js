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
import axios from "axios";

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
  } = props.values;
  const [data, setdata] = useState([]);
  const [numeroFormation, setnumeroFormation] = useState(NUMERO_FORMATION);
  const [numeroAgrement] = useState(NUMERO_AGREMENT);
  const [typeFormation, setTypeFormation] = useState(TYPE_FORMATION);
  const [debut, setDebut] = useState(DEBUT);
  const [fin, setFin] = useState(FIN);
  const [open, setOpen] = useState(false);
  const [groupe, setGroupe] = useState(GROUPE);

  const handleTypeChange = (e) => {
    setTypeFormation(e.target.value);
  };
  const handleGroupeChange = (e) => {
    setGroupe(e.target.value);
  };

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL +"/api/get_form")
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

  const addFormation = (
    numeroFormation,
    numeroAgrement,
    groupe,
    Type,
    Debut,
    Fin
  ) => {
    axios
      .post(process.env.REACT_APP_API_URL + "/Add_formation", {
        numeroFormation: numeroFormation,
        numeroAgrement: numeroAgrement,
        groupe: groupe,
        Type: Type,
        Debut: Debut,
        Fin: Fin,
      })
      .then(() => {
        props.setEtat(!props.etat);
      });
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
                if (props.onClick.name === "addFormation") {
                  add();
                }
                if (props.onClick.name === "updateFormation") {
                  update();
                }
              }}
            />

            <Controls.Button
              text="إلغاء"
              variant="contained"
              color="secondary"
              size="small"
              onClick={() => {
                setOpen(false);
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
          addFormation(
            numeroFormation,
            numeroAgrement,
            groupe,
            typeFormation,
            convert(debut),
            convert(fin)
          );
          props.Close(false);
        }}
      />
    </Fragment>
  );
}
