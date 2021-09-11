import React, { useState, useRef, Fragment, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import {
  FormGroup,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Controls from "../components/controls/Controls";
import AlertDialog from "../components/controls/Dialog";
import Popup from "../components/Popup";
import ListCategorie from "./CategoriePermis";
import { UserContext } from "../UserContext";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
    },
    "& .MuiButtonBase-root": {
      width: "38%",
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
    width: "auto",
    height: "auto",
  },
  Div: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    display: "flex",
    justifyContent: "space-between",
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function Candidat(props) {
  const classes = useStyles();
  const textField = useRef(null);

  const {
    ADRESSE_CANDIDAT,
    DATE_NAIS_CANDIDAT,
    LIEU_NAIS_CANDIDAT,
    NIVEAU_SCOL_CANDIDAT,
    NOM_CANDIDAT,
    NUM_INS,
    PRENOM_CANDIDAT,
    PRENOM_PERE,
    SEX_CONDIDAT,
    NUM_PERMIS,
    DATE_LIV_PERMIS,
    CATEGORIE_PERMIS,
    TYPE_PERMIS,
    DATE_INS,
    TYPE_CANDIDAT,
  } = props.values || [];

  const [selectedDate, setSelectedDate] = useState(DATE_NAIS_CANDIDAT);
  const [numeroCandidat, setNumeroCandidat] = useState(NUM_INS);
  const [Date_ins, setDate_ins] = useState(DATE_INS);
  const [Type_candidat, setType_candidat] = useState(TYPE_CANDIDAT);
  const [Nom, setNom] = useState(NOM_CANDIDAT);
  const [Prenom, setPrenom] = useState(PRENOM_CANDIDAT);
  const [PrenomPere, setPrenomPere] = useState(PRENOM_PERE);
  const [Lieu, setLieu] = useState(LIEU_NAIS_CANDIDAT);
  const [Niveau, setNiveau] = useState(NIVEAU_SCOL_CANDIDAT);
  const [Adresse, setAdresse] = useState(ADRESSE_CANDIDAT);
  const [Sexe, setSexe] = useState(SEX_CONDIDAT);
  const [Typepermis, setTypePermis] = useState(TYPE_PERMIS);
  const [NumPermis, setNumPermis] = useState(NUM_PERMIS);
  const [LivPermis, setLivPermis] = useState(DATE_LIV_PERMIS);
  //  const [ExpPermis, setExpPermis] = useState(DATE_EXP_PERMIS);
  const [CategoriePermis, setCategoriePermis] = useState(CATEGORIE_PERMIS);
  const [textChanged, setTextChanged] = useState(false);
  const [open, setOpen] = useState(false);
  const [Categorie, setOpenCategorie] = useState(false);
  const { userData } = useContext(UserContext);
  const numeroAgrement = userData[0].NUMERO_AGREMENT;
  const Num_insc =
    numeroCandidat + "-" + new Date().getFullYear() + "-" + numeroAgrement;

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleSexeChange = (event) => {
    setSexe(event.target.value);
  };
  const handleTypePermisChange = (event) => {
    setTypePermis(event.target.value);
    setCategoriePermis("");
  };

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

  function CandidatExists(id, date, num_permis) {
    return props.data.some(function (el) {
      if (
        el.NUM_INS === id &&
        el.DATE_INS === convert(date) &&
        el.NUM_PERMIS === num_permis
      ) {
        return true;
      } else {
        return false;
      }
    });
  }
  function TestNumIns(id) {
    return props.data.some(function (el) {
      if (el.NUM_INS === id) {
        return true;
      } else {
        return false;
      }
    });
  }

  const messageB = "هل أنت متأكد من القيام بهذه العملية ؟";

  const Enregister = () => {
    const dt1 = new Date(selectedDate);
    const dt0 = new Date();

    if (
      Nom === "" ||
      numeroCandidat === "" ||
      Date_ins === "" ||
      Type_candidat === "" ||
      Prenom === "" ||
      selectedDate === "" ||
      Lieu === "" ||
      Niveau === "" ||
      Adresse === "" ||
      PrenomPere === "" ||
      Sexe === "" ||
      NumPermis === "" ||
      LivPermis === "" ||
      CategoriePermis === "" ||
      Typepermis === ""
    ) {
      alert("يجب ملئ جميع البيانات ");
    } else if (convert(dt1) >= convert(dt0)) {
      alert("تاريخ الميلاد خاطئ");
    } else if (
      CandidatExists(Num_insc, Date_ins, NumPermis) === true &&
      props.onClick.name === "addCondidat"
    ) {
      alert("المترشح مسجل من قبل");
    } else if (
      CandidatExists(numeroCandidat, Date_ins, NumPermis) === true &&
      props.onClick.name === "updateCandidat" &&
      textChanged === true
    ) {
      alert("المترشح مسجل من قبل");
    } else if (TestNumIns(Num_insc)) {
      alert("رقم التسجيل مكرر");
    } else {
      handleClickOpen();
    }
  };

  const niveauScolaire = ["ابتدائي", "متوسط", "ثانوي", "جامعي", "بدون مستوى"];
  const Type = ["متعاقد", "حر"];

  return (
    <Fragment>
      <Paper className={classes.pageContent}>
        <form className={classes.root} noValidate autoComplete="on">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                label=" رقم التسجيل"
                value={numeroCandidat}
                size="small"
                /*    disabled={
                  props.onClick.name === "updateCandidat" ? true : false
                } */
                onChange={(e) => setNumeroCandidat(e.target.value)}
              />
              <Controls.DatePicker
                label="تاريخ التسجيل"
                value={Date_ins}
                onChange={setDate_ins}
              />
              <FormControl>
                <InputLabel id="demo-simple-select-label">
                  نوع المترشح
                </InputLabel>
                <Select
                  labelId="demo-simple-select"
                  id="demo-simple-select"
                  value={Type_candidat}
                  onChange={(e) => setType_candidat(e.target.value)}
                >
                  {Type.map((type) => {
                    return (
                      <MenuItem key={type} value={type}>
                        {" "}
                        {type}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <TextField
                variant="outlined"
                label="اللقب"
                value={Nom}
                size="small"
                onChange={(e) => setNom(e.target.value)}
              />
              <TextField
                variant="outlined"
                label="الإسم"
                size="small"
                value={Prenom}
                onChange={(e) => setPrenom(e.target.value)}
              />
              <TextField
                variant="outlined"
                label="إسم الأب"
                size="small"
                value={PrenomPere}
                onChange={(e) => setPrenomPere(e.target.value)}
              />
              <TextField
                variant="outlined"
                label="العنوان"
                value={Adresse}
                size="small"
                onChange={(e) => setAdresse(e.target.value)}
              />
              <TextField
                variant="outlined"
                label="مكان الميلاد"
                value={Lieu}
                size="small"
                onChange={(e) => setLieu(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <Controls.DatePicker
                label="تاريخ الميلاد"
                value={selectedDate}
                onChange={setSelectedDate}
              />
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">
                  المستوى الدراسي
                </InputLabel>
                <Select
                  labelId="demo-simple-select"
                  id="demo-simple-select"
                  value={Niveau}
                  onChange={(e) => setNiveau(e.target.value)}
                >
                  {niveauScolaire.map((niveau) => {
                    return (
                      <MenuItem key={niveau} value={niveau}>
                        {" "}
                        {niveau}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl component="fieldset">
                <FormLabel component="legend">Sexe</FormLabel>
                <RadioGroup
                  row
                  aria-label="الجنس"
                  name="gender1"
                  value={Sexe}
                  className={classes.group}
                  onChange={handleSexeChange}
                >
                  <FormControlLabel
                    value="أنثى"
                    control={<Radio />}
                    label="انثى"
                  />
                  <FormControlLabel
                    value="ذكر"
                    control={<Radio />}
                    label="ذكر"
                  />
                </RadioGroup>
              </FormControl>
              <TextField
                variant="outlined"
                label="رقم رخسة السياقة"
                disabled={
                  props.onClick.name === "updateCandidat" ? true : false
                }
                value={NumPermis}
                size="small"
                onChange={(e) => {
                  setNumPermis(e.target.value);
                  setTextChanged(true);
                }}
                ref={textField}
              />
              <Controls.DatePicker
                label="تاريخ الإصدار"
                value={LivPermis}
                onChange={setLivPermis}
              />
              <FormControl component="fieldset">
                <FormLabel component="legend">Type de Permis</FormLabel>
                <RadioGroup
                  row
                  className={classes.group}
                  aria-label="نوع رخصة السياقة"
                  name="Permis"
                  value={Typepermis}
                  onChange={handleTypePermisChange}
                >
                  <FormControlLabel
                    value="بيومتري"
                    control={<Radio />}
                    label="بيومتري"
                  />
                  <FormControlLabel
                    value="القديم"
                    control={<Radio />}
                    label="القديم"
                  />
                </RadioGroup>
              </FormControl>

              <FormGroup row>
                <Typography color="textSecondary" variant="h6" paragraph={true}>
                  الأصناف :
                  <Typography color="textPrimary" variant="h6" paragraph={true}>
                    {" "}
                    {CategoriePermis}
                  </Typography>
                </Typography>
                <IconButton
                  style={{
                    width: "40px",
                  }}
                  aria-label="Ajouter"
                  onClick={() => {
                    setOpenCategorie(true);
                  }}
                >
                  <AddCircleIcon />
                </IconButton>
              </FormGroup>

              <Grid item xs={12}>
                <Controls.Button
                  text="موافق"
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={Enregister}
                />
                <Controls.Button
                  text="إلغاء"
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={() => {
                    props.Close(false);
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <AlertDialog
        title="تأكيد"
        message={messageB}
        open={open}
        setOpen={setOpen}
        method={() => {
          try {
            if (props.type === "add") {
              props.onClick(
                Num_insc,
                convert(Date_ins),
                Nom,
                Prenom,
                convert(selectedDate),
                Lieu,
                Niveau,
                Adresse,
                PrenomPere,
                Sexe,
                Type_candidat,
                NumPermis,
                convert(LivPermis),
                CategoriePermis.toString(),
                Typepermis,
                convert(Date_ins)
              );
            } else if (props.type === "update") {
              props.onClick(
                NUM_INS,
                numeroCandidat,
                convert(DATE_INS),
                Nom,
                Prenom,
                convert(selectedDate),
                Lieu,
                Niveau,
                Adresse,
                PrenomPere,
                Sexe,
                Type_candidat,
                NumPermis,
                convert(LivPermis),
                CategoriePermis.toString(),
                Typepermis,
                convert(Date_ins)
              );
            }
          } catch (err) {
            console.log(err);
          }

          props.setOpenWindows(false);
        }}
      />

      <Popup
        title="إختيار الاصناف"
        openPopup={Categorie}
        setOpenPopup={setOpenCategorie}
      >
        <ListCategorie
          key="CategoriePermis"
          setOpenCategorie={setOpenCategorie}
          Typepermis={Typepermis}
          setCategoriePermis={setCategoriePermis}
        />
      </Popup>
    </Fragment>
  );
}
