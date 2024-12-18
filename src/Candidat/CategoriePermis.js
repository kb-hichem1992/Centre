import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  makeStyles,
  Paper,
} from "@material-ui/core";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "100%",
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

export default function ListCategorie(props) {
  const { Typepermis, setCategoriePermis, setOpenCategorie } =
    props;
  const classes = useStyles();
  const [CatNormal, setCatNormal] = useState({
    A1: false,
    A2: false,
    B: false,
    C1: false,
    C2: false,
    D: false,
    E: false,
    F: false,
  });

  const [CatNew, setCatNew] = useState({
    A1: false,
    A: false,
    B: false,
    D: false,
    C1: false,
    C: false,
    BE: false,
    C1E: false,
    CE: false,
    DE: false,
    F: false,
  });

  const Normal = Object.keys(CatNormal);
  const New = Object.keys(CatNew);

  const handleCatNormalChange = (event) => {
    setCatNormal({ ...CatNormal, [event.target.name]: event.target.checked });
  };

  const handleCatNewChange = (event) => {
    setCatNew({ ...CatNew, [event.target.name]: event.target.checked });
  };

  function getCatgr(ele) {
    const asArray = Object.entries(ele);
    const filteredArr = asArray.filter(([key, value]) => value === true);
    const Validelemnts = Object.fromEntries(filteredArr);
    return Object.keys(Validelemnts).toString();
  }
  return (
    <Paper style={{ maxWidth: "auto" }}>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={12}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Catégories de permis</FormLabel>
            <FormGroup row>
              {Typepermis === "القديم"
                ? Normal.map((key) => {
                    return (
                      <FormControlLabel
                        key={key}
                        control={
                          <Checkbox
                            value={key}
                            name={key}
                            checked={CatNormal.key}
                            onChange={(e) => {
                              handleCatNormalChange(e);
                            }}
                          />
                        }
                        label={key}
                      />
                    );
                  })
                : New.map((key) => {
                    return (
                      <FormControlLabel
                        key={key}
                        control={
                          <Checkbox
                            value={key}
                            name={key}
                            checked={CatNew.key}
                            onChange={(e) => {
                              handleCatNewChange(e);
                            }}
                          />
                        }
                        label={key}
                      />
                    );
                  })}
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => {
              Typepermis === "القديم"
                ? setCategoriePermis(getCatgr(CatNormal))
                : setCategoriePermis(getCatgr(CatNew));
              setOpenCategorie(false);
            }}
          >
            Enregister
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
