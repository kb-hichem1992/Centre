import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormGroup,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Fragment, useEffect, useRef, useState } from "react";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Controls from "../components/controls/Controls";
import AlertDialog from "../components/controls/Dialog";
import Popup from "../components/Popup";
import ListCategorie from "./CategoriePermis";

import { Stack } from "@mui/material";
import axios from "axios";
import InputMask from "react-input-mask";
import { useLocalStorage } from "../useLocalStorage";

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

  FormGroup: {
    display: "inline",
  },
}));

export default function CandidatFormulaire(props) {
  const classes = useStyles();
  const textField = useRef(null);
  const niveauScolaire = ["ابتدائي", "متوسط", "ثانوي", "جامعي", "بدون مستوى"];
  const messageB = "هل أنت متأكد من القيام بهذه العملية ؟";

  // extract initial values from props
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
    NUMERO_NAT,
    ID_TYPE_FORMATION,
    FORMATION,
    VEHICULE,
    ID_VEHICULE,
    TELE_FIRST,
    TELE_SECOND,
    PRIX,
    MONTANT,
  } = props.values || [];

  const candidatValues = props.values;

  // extracting  functions and states from props
  const { refresh, etat, action, setOpenPopup } = props;

  const [selectedDate, setSelectedDate] = useState(DATE_NAIS_CANDIDAT);
  const [numeroCandidat, setNumeroCandidat] = useState(props.numCand);
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
  const [CategoriePermis, setCategoriePermis] = useState(CATEGORIE_PERMIS);
  const [numeroNationnal, setNumeroNationnal] = useState(NUMERO_NAT);
  const [typesFormation, setTypesFormtion] = useState([]);
  const [selectedTypeFormation, setSelectedTypeFormation] =
    useState(ID_TYPE_FORMATION);
  const [prix, setPrix] = useState(PRIX);
  const [error, setError] = useState(false);
  const [phoneNumberFirst, setPhoneNumberFirst] = useState(TELE_FIRST);
  const [phoneNumberSecond, setPhoneNumberSecond] = useState(TELE_SECOND);
  const [montant, setMontant] = useState(MONTANT);
  const [vehicules, setVehicules] = useState([]);
  const [selectedVehicule, setSelectedVehicule] = useState(ID_VEHICULE);
  const [openAddVihiculeDialog, setOpenAddVihiculeDialog] = useState(false);
  const [newVehicule, setNewVehicule] = useState("");
  const [textChanged, setTextChanged] = useState(false);
  const [NumNatChanged, setNumNatChanged] = useState(false);
  const [open, setOpen] = useState(false);
  const [Categorie, setOpenCategorie] = useState(false);
  const [numeroAgrement] = useLocalStorage("user", 0);
  const [createur] = useLocalStorage("typeUser");
  const Num_insc =
    numeroCandidat +
    "-" +
    new Date(Date_ins).getFullYear() +
    "-" +
    numeroAgrement;
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/api/type_formation")
      .then((response) => {
        setTypesFormtion(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    axios
      .get(process.env.REACT_APP_API_URL + "/api/vehicules")
      .then((response) => {
        setVehicules(response.data);
      })
      .catch((error) => {
        console.error("Error fetching vehicule types:", error);
      });
  }, []);

  const handleSexeChange = (event) => {
    setSexe(event.target.value);
  };

  const handleTypePermisChange = (event) => {
    setTypePermis(event.target.value);
    setCategoriePermis("");
  };

  function changePrice(selectedTypeFormationId) {
    const selectedTypeFormation = typesFormation.find(
      (type) => type.id === selectedTypeFormationId
    );
    setPrix(selectedTypeFormation ? selectedTypeFormation.prix : "");
  }

  const handleChangeTypeFormation = (event) => {
    const selectedTypeFormationId = event.target.value;
    setSelectedTypeFormation(selectedTypeFormationId);
    setError(selectedTypeFormationId === "");
    changePrice(selectedTypeFormationId);
  };

  const handlePhoneNumberFirstChange = (event) => {
    setPhoneNumberFirst(event.target.value);
  };

  const handlePhoneNumberSecondChange = (event) => {
    setPhoneNumberSecond(event.target.value);
  };

  const handleTypeVehiculeChange = (event) => {
    const vehiculeID = event.target.value;
    if (vehiculeID === "add_new") {
      setOpenAddVihiculeDialog(true);
    } else {
      setSelectedVehicule(vehiculeID);
    }
  };

  const handleAddVehicle = () => {
    axios
      .post(process.env.REACT_APP_API_URL + "/api/add-vehicule", {
        lib: newVehicule,
      })
      .then((response) => {
        setVehicules([
          ...vehicules,
          { id: response.data.id, lib: newVehicule },
        ]);
        setSelectedVehicule(newVehicule);
        setOpenAddVihiculeDialog(false);
        //  setNewVehicule("");
      })
      .catch((error) => {
        console.error("Error adding new vehicle:", error);
      });
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

  function TestNumIns(id) {
    return props.data.some(function (el) {
      if (el.NUM_INS === id) {
        return true;
      } else {
        return false;
      }
    });
  }

  const isValueMissing = (value) => {
    return value === undefined || value === null || value === "";
  };

  const ValiderCandidat = () => {
    const dt1 = new Date(selectedDate);
    const dt0 = new Date();
    if (
      isValueMissing(numeroNationnal) ||
      isValueMissing(Date_ins) ||
      isValueMissing(Nom) ||
      isValueMissing(Prenom) ||
      isValueMissing(PrenomPere) ||
      isValueMissing(selectedDate) ||
      isValueMissing(niveauScolaire) ||
      isValueMissing(Adresse) ||
      isValueMissing(Sexe) ||
      isValueMissing(NumPermis) ||
      isValueMissing(Typepermis) ||
      isValueMissing(CategoriePermis) ||
      isValueMissing(selectedTypeFormation) ||
      isValueMissing(selectedVehicule) ||
      isValueMissing(phoneNumberFirst) ||
      isValueMissing(montant)
    ) {
      alert("يجب عليك ملء جميع المعلومات");
    } else if (convert(dt1) >= convert(dt0)) {
      alert("تاريخ الميلاد خاطئ");
    } else if (TestNumIns(Num_insc) && action === "add") {
      alert("رقم التسجيل مكرر");
    } else if (
      TestNumIns(Num_insc) &&
      action === "update" &&
      textChanged === true
    ) {
      alert("رقم التسجيل مكرر");
    } else if (CategoriePermis === "B") {
      alert(" صنف رخسة السياقة غير مقبول");
    } else {
      setOpen(true);
    }
  };

  const handleDateChange = (date) => {
    setDate_ins(date);
  };

  const handleNumeroNationnalChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setNumeroNationnal(value);
      setNumNatChanged(true);
    }
  };

  const handleMontantChange = (event) => {
    let value = event.target.value;
    value = value.replace(/[^0-9.]/g, ""); // Remove all non-numeric characters except for periods
    value = value.replace(/(\..*)\./g, "$1"); // Remove all additional periods
    if (value.indexOf(".") !== -1) {
      let parts = value.split(".");
      parts[1] = parts[1].slice(0, 2); // Limit to two decimal places
      value = parts.join(".");
    }
    setMontant(value);
  };

  const handleNumPermisChnged = (event) => {
    setNumPermis(event.target.value);
    setTextChanged(true);
  };
  const Add = (
    NUM_INS,
    DATE_INS,
    NUMERO_NAT,
    NOM_CANDIDAT,
    PRENOM_CANDIDAT,
    PRENOM_PERE,
    DATE_NAIS_CANDIDAT,
    LIEU_NAIS_CANDIDAT,
    NIVEAU_SCOL_CANDIDAT,
    ADRESSE_CANDIDAT,
    SEX_CONDIDAT,
    TYPE_CANDIDAT,
    NUM_PERMIS,
    TYPE_PERMIS,
    CATEGORIE_PERMIS,
    CREATEUR,
    ID_TYPE_FORMATION,
    ID_VEHICULE,
    TELE_FIRST,
    TELE_SECOND,
    MONTANT,
    RESTE
  ) => {
    axios
      .post(process.env.REACT_APP_API_URL + "/api/candidats", {
        NUM_INS: NUM_INS,
        DATE_INS: DATE_INS,
        NUMERO_NAT: NUMERO_NAT,
        NOM_CANDIDAT: NOM_CANDIDAT,
        PRENOM_CANDIDAT: PRENOM_CANDIDAT,
        PRENOM_PERE: PRENOM_PERE,
        DATE_NAIS_CANDIDAT: DATE_NAIS_CANDIDAT,
        LIEU_NAIS_CANDIDAT : LIEU_NAIS_CANDIDAT,
        NIVEAU_SCOL_CANDIDAT: NIVEAU_SCOL_CANDIDAT,
        ADRESSE_CANDIDAT: ADRESSE_CANDIDAT,
        SEX_CONDIDAT: SEX_CONDIDAT,
        TYPE_CANDIDAT: TYPE_CANDIDAT,
        NUM_PERMIS: NUM_PERMIS,
        TYPE_PERMIS: TYPE_PERMIS,
        CATEGORIE_PERMIS: CATEGORIE_PERMIS,
        CREATEUR: CREATEUR,
        ID_TYPE_FORMATION: ID_TYPE_FORMATION,
        ID_VEHICULE: ID_VEHICULE,
        TELE_FIRST: TELE_FIRST,
        TELE_SECOND: TELE_SECOND,
        MONTANT: MONTANT,
        RESTE: RESTE,
      })
      .then(() => {
        refresh(!etat);
      })
      .catch((error) => console.log(error));
  };

  const update = (
    NUM_INS,
    DATE_INS,
    NUMERO_NAT,
    NOM_CANDIDAT,
    PRENOM_CANDIDAT,
    PRENOM_PERE,
    DATE_NAIS_CANDIDAT,
    LIEU_NAIS_CANDIDAT,
    NIVEAU_SCOL_CANDIDAT,
    ADRESSE_CANDIDAT,
    SEX_CONDIDAT,
    TYPE_CANDIDAT,
    NUM_PERMIS,
    TYPE_PERMIS,
    CATEGORIE_PERMIS,
    CREATEUR,
    ID_TYPE_FORMATION,
    ID_VEHICULE,
    TELE_FIRST,
    TELE_SECOND,
    MONTANT,
    RESTE
  ) => {
    axios
      .put(
        process.env.REACT_APP_API_URL +
          "/updateCandidat/" +
          NUM_INS +
          "/" +
          DATE_INS +
          "/" +
          NUM_PERMIS,
        {
          NUMERO_NAT: NUMERO_NAT,
          NOM_CANDIDAT: NOM_CANDIDAT,
          PRENOM_CANDIDAT: PRENOM_CANDIDAT,
          PRENOM_PERE: PRENOM_PERE,
          DATE_NAIS_CANDIDAT: DATE_NAIS_CANDIDAT,
          LIEU_NAIS_CANDIDAT: LIEU_NAIS_CANDIDAT,
          NIVEAU_SCOL_CANDIDAT: NIVEAU_SCOL_CANDIDAT,
          ADRESSE_CANDIDAT: ADRESSE_CANDIDAT,
          SEX_CONDIDAT: SEX_CONDIDAT,
          TYPE_CANDIDAT: TYPE_CANDIDAT,
          TYPE_PERMIS: TYPE_PERMIS,
          CATEGORIE_PERMIS: CATEGORIE_PERMIS,
          CREATEUR: CREATEUR,
          ID_TYPE_FORMATION: ID_TYPE_FORMATION,
          ID_VEHICULE: ID_VEHICULE,
          TELE_FIRST: TELE_FIRST,
          TELE_SECOND: TELE_SECOND,
          MONTANT: MONTANT,
          RESTE: RESTE,
        }
      )
      .then(() => {
        refresh(!etat);
      });
  };

  return (
    <Fragment>
      <Paper className={classes.pageContent}>
        <form className={classes.root} noValidate autoComplete="on">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={0.5}
              >
                <TextField
                  variant="outlined"
                  label=" رقم التسجيل"
                  value={numeroCandidat}
                  size="small"
                  style={{ width: "auto" }}
                  onChange={(e) => {
                    setNumeroCandidat(e.target.value);
                    setTextChanged(true);
                  }}
                />
                <p> {new Date(Date_ins).getFullYear()} - </p>
                <p>{numeroAgrement}</p>
              </Stack>
              <Controls.DatePicker
                label="تاريخ التسجيل"
                value={Date_ins}
                onChange={handleDateChange}
              />
              <TextField
                variant="outlined"
                label="الرقم الوطني"
                value={numeroNationnal}
                size="small"
                inputProps={{ maxLength: 18, pattern: "\\d*" }}
                onChange={handleNumeroNationnalChange}
              />
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
              <Controls.DatePicker
                label="تاريخ الميلاد"
                value={selectedDate}
                onChange={setSelectedDate}
              />
              <TextField
                variant="outlined"
                label="مكان الميلاد"
                value={Lieu}
                size="small"
                onChange={(e) => setLieu(e.target.value)}
              />
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="demo-simple-select-label">
                  المستوى الدراسي
                </InputLabel>
                <Select
                  labelId="demo-simple-select"
                  id="demo-simple-select"
                  value={Niveau}
                  onChange={(e) => setNiveau(e.target.value)}
                  label=" المستوى الدراسي"
                >
                  {niveauScolaire.map((niveau) => {
                    return (
                      <MenuItem key={niveau} value={niveau}>
                        {niveau}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl component="fieldset">
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
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="outlined" fullWidth required error={error}>
                <InputLabel id="type-formation-label">نوع التكوين</InputLabel>
                <Select
                  labelId="type-formation-label"
                  id="type-formation-select"
                  value={selectedTypeFormation}
                  onChange={handleChangeTypeFormation}
                  label="Type Formation"
                >
                  {typesFormation.map((type) => (
                    <MenuItem key={type.id} value={type.id}>
                      {type.lib}
                    </MenuItem>
                  ))}
                </Select>
                {error && <FormHelperText>إجباري</FormHelperText>}
              </FormControl>
              {selectedTypeFormation && (
                <TextField
                  label="سعر التكوين"
                  value={prix}
                  variant="outlined"
                  fullWidth
                  size="small"
                  InputProps={{ readOnly: true }}
                  margin="normal"
                />
              )}
              {selectedTypeFormation && (
                <TextField
                  label=" المبلغ المدفوغ"
                  value={montant}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  inputProps={{ maxLength: 18, pattern: "\\d*" }}
                  onChange={handleMontantChange}
                  size="small"
                />
              )}

              <FormControl fullWidth variant="outlined">
                <InputLabel id="vehicle-select-label">المركبة </InputLabel>
                <Select
                  labelId="vehicle-select-label"
                  id="vehicle-select"
                  value={selectedVehicule}
                  onChange={handleTypeVehiculeChange}
                  label="نوع المركبة"
                >
                  {vehicules.map((vehicule) => (
                    <MenuItem key={vehicule.id} value={vehicule.id}>
                      {vehicule.lib}
                    </MenuItem>
                  ))}
                  <MenuItem value="add_new">إضافة مركبة</MenuItem>
                </Select>
                <Dialog
                  open={openAddVihiculeDialog}
                  onClose={() => setOpenAddVihiculeDialog(false)}
                >
                  <DialogTitle>إضافة مركبة</DialogTitle>
                  <DialogContent>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="newVehicule"
                      label="نوع المركبة"
                      type="text"
                      fullWidth
                      value={newVehicule}
                      onChange={(e) => setNewVehicule(e.target.value)}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={() => setOpenAddVihiculeDialog(false)}
                      color="primary"
                    >
                      إلغاء
                    </Button>
                    <Button onClick={handleAddVehicle} color="primary">
                      حفظ
                    </Button>
                  </DialogActions>
                </Dialog>
              </FormControl>
              <TextField
                variant="outlined"
                label="رقم رخسة السياقة"
                disabled={action === "update_candidat" ? true : false}
                value={NumPermis}
                size="small"
                onChange={handleNumPermisChnged}
                ref={textField}
              />
              <FormControl component="fieldset">
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
              <FormControl fullWidth>
                <InputMask
                  mask="0999-99-99-99"
                  value={phoneNumberFirst}
                  onChange={handlePhoneNumberFirstChange}
                >
                  {(inputProps) => (
                    <TextField
                      {...inputProps}
                      id="phone-number"
                      variant="standard"
                      label="رقم الهاتف الأول"
                      fullWidth
                    />
                  )}
                </InputMask>
              </FormControl>
              <FormControl fullWidth>
                <InputMask
                  mask="0999 99 99 99"
                  value={phoneNumberSecond}
                  onChange={handlePhoneNumberSecondChange}
                >
                  {(inputProps) => (
                    <TextField
                      {...inputProps}
                      id="phone-number"
                      variant="standard"
                      label="رقم الهاتف الثاني"
                      fullWidth
                    />
                  )}
                </InputMask>
              </FormControl>
              <Grid item xs={12}>
                <Controls.Button
                  text="موافق"
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={ValiderCandidat}
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
            if (action === "add_candidat") {
              Add(
                Num_insc,
                convert(Date_ins),
                numeroNationnal,
                Nom,
                Prenom,
                PrenomPere,
                convert(selectedDate),
                Lieu,
                Niveau,
                Adresse,
                Sexe,
                Type_candidat,
                NumPermis,
                Typepermis,
                CategoriePermis.toString(),
                createur,
                selectedTypeFormation,
                selectedVehicule,
                phoneNumberFirst,
                phoneNumberSecond,
                montant,
                prix - montant
              );
            } else if (action === "update_candidat") {
              update(
                Num_insc,
                convert(Date_ins),
                numeroNationnal,
                Nom,
                Prenom,
                PrenomPere,
                convert(selectedDate),
                Lieu,
                Niveau,
                Adresse,
                Sexe,
                Type_candidat,
                NumPermis,
                Typepermis,
                CategoriePermis.toString(),
                createur,
                selectedTypeFormation,
                selectedVehicule,
                phoneNumberFirst,
                phoneNumberSecond,
                montant,
                prix - montant
              );
            }
          } catch (err) {
            console.log(err);
          }
          setOpen(false);
          setOpenPopup(false);
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
          CategoriePermis={CategoriePermis}
          Typepermis={Typepermis}
          setCategoriePermis={setCategoriePermis}
        />
      </Popup>
    </Fragment>
  );
}
