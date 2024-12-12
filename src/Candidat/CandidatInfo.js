import { makeStyles } from "@material-ui/core/styles";
import { Fragment } from "react";
import "./Candidat.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "auto",
      margin: theme.spacing(1),
    },
    "& .MuiDialog-paper-root": {
      width: "auto",
      margin: theme.spacing(1),
    },
    "& .MuiButtonBase-root": {
      width: "38%",
      margin: theme.spacing(1),
    },
  },
  pageContent: {
    margin: theme.spacing(0),
    padding: theme.spacing(1),
    width: 850,
    height: "auto",
  },
}));

export default function CandidatInfo(props) {
  const classes = useStyles();
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
  const {
    NUMERO_NAT,
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
    CATEGORIE_PERMIS,
    TYPE_PERMIS,
    DATE_INS,
    TYPE_CANDIDAT,
    TELE_FIRST,
    TELE_SECOND,
    MONTANT,
    RESTE,
    VEHICULE,
    FORMATION ,
    PRIX
  } = props.values || [];

  return (
    <Fragment>
 
        <div className="candidat-details">
          
          <h2>Information sur le Candidat</h2>
          <ul>
            
            <li>
              <strong>Numéro d'inscription:</strong> <strong> {NUM_INS} </strong> 
            </li>
            <li>
              <strong>Date d'inscription:</strong>  <strong> {DATE_INS}</strong> 
            </li>
            <li>
              <strong>Numéro national:</strong> <strong> {NUMERO_NAT}</strong> 
            </li>
            <li>
              <strong>Nom:</strong> <strong> {NOM_CANDIDAT}</strong> 
            </li>
            <li>
              <strong>Prénom:</strong> <strong> {PRENOM_CANDIDAT}</strong> 
            </li>
            <li>
              <strong>Prénom du père:</strong> <strong> {PRENOM_PERE}</strong> 
            </li>
            <li>
              <strong>Date de naissance:</strong> <strong> {DATE_NAIS_CANDIDAT}</strong> 
            </li>
            <li>
              <strong>Lieu de naissance:</strong> <strong> {LIEU_NAIS_CANDIDAT}</strong> 
            </li>
            <li>
              <strong>Niveau scolaire:</strong><strong> {NIVEAU_SCOL_CANDIDAT}</strong> 
            </li>
            <li>
              <strong>Adresse:</strong> <strong> {ADRESSE_CANDIDAT}</strong> 
            </li>
            <li>
              <strong>Sexe:</strong> <strong> {SEX_CONDIDAT}</strong>  
            </li>
            <li>
              <strong>Type de candidat:</strong> <strong> {TYPE_CANDIDAT}</strong>  
            </li>
            <li>
              <strong>Numéro de permis:</strong> <strong> {NUM_PERMIS}</strong> 
            </li>
            <li>
              <strong>Type de permis:</strong><strong> {TYPE_PERMIS}</strong>  
            </li>
            <li>
              <strong>Catégorie de permis:</strong> <strong> {CATEGORIE_PERMIS}</strong>  
            </li>
  
            <li>
              <strong>Formation:</strong> <strong> {FORMATION}</strong>
            </li>
            <li>
              <strong>Véhicule:</strong><strong> {VEHICULE}</strong> 
            </li>
            <li>
              <strong>Numéro de téléphone (1):</strong>  <strong> {TELE_FIRST}</strong> 
            </li>
            <li>
              <strong>Numéro de téléphone (2):</strong> <strong> {TELE_SECOND}</strong>
            </li> 
             <li>
              <strong>Prix de Formation:</strong> <strong> {PRIX}</strong>
            </li>
            <li>
              <strong>Montant:</strong> <strong> {MONTANT}</strong> 
            </li>
            <li>
              <strong>Reste:</strong> <strong> {RESTE}</strong> 
            </li>
          </ul>
        </div>
    
    </Fragment>
  );
}
