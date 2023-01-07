import React, { useState } from "react";
import {
  TextField,
  Paper,
  makeStyles,
  Button,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import axios from "axios";
import Controls from "../components/controls/Controls";
import { Stack } from "@mui/material";
import PersonOutlineSharpIcon from "@mui/icons-material/PersonOutlineSharp";
import PopupFull from "../components/PopupFullScreen";
import ListTravailleur from "../Opérateur/ListTravailleur";

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

export default function VehiculeForm(props) {
  const classes = useStyles();
  const [matricule, setmatricule] = useState("");
  const [mark, setmark] = useState("");
  const [ptc, setptc] = useState("");
  const [ptac, setptac] = useState("");
  const [cu, setcu] = useState("");
  const [num_peris, setnum_peris] = useState("");
  const [num_ins, setnum_ins] = useState("");
  const [date_ins, setdate_ins] = useState("");
  const [openListeCandidat, setopenListeCandidat] = useState(false);
  const handleMatriculeChange = (e) => {
    setmatricule(e.target.value);
  };
  const handleMarkChange = (e) => {
    setmark(e.target.value);
  };
  const handlePtcChange = (e) => {
    setptc(e.target.value);
  };
  const handlePtacChange = (e) => {
    setptac(e.target.value);
  };
  const handleCuChange = (e) => {
    setcu(e.target.value);
  };
  const handleNumPermisChange = (e) => {
    setnum_peris(e.target.value);
  };
  const openList = () => {
    setopenListeCandidat(true);
  };

  return (
    <>
      <div>
        <Paper className={classes.pageContent}>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              variant="outlined"
              label="الترقيم"
              size="small"
              value={matricule}
              onChange={handleMatriculeChange}
            />
            <TextField
              variant="outlined"
              label="العلامة"
              size="small"
              value={mark}
              onChange={handleMarkChange}
            />
            <TextField
              variant="outlined"
              label="PTC"
              size="small"
              type="number"
              value={ptc}
              onChange={handlePtcChange}
            />
            <TextField
              variant="outlined"
              label="PATC"
              size="small"
              type="number"
              value={ptac}
              onChange={handlePtacChange}
            />
            <TextField
              variant="outlined"
              label="CU"
              size="small"
              type="number"
              value={cu}
              onChange={handleCuChange}
            />
            <Stack direction="row" spacing={1}>
              <TextField
                variant="outlined"
                label="رقم رخصة السائق"
                size="small"
                disabled
                value={num_peris}
                onChange={handleNumPermisChange}
              />
              <Tooltip title="قائمة العمال" arrow>
                <IconButton
                  style={{ width: "auto" }}
                  aria-label="add"
                  onClick={openList}
                >
                  <PersonOutlineSharpIcon />
                </IconButton>
              </Tooltip>
            </Stack>
            <Button>تأكيد</Button>
          </form>
        </Paper>
      </div>

      <PopupFull
        title=" قائمة العمال "
        openPopup={openListeCandidat}
        setOpenPopup={setopenListeCandidat}
      >
        <ListTravailleur
          api={"/api/get_candidat_foreach_operateur_noVehcule/"}
          selectedValue={props.Values || ""}
          type="show"
          setnum_peris={setnum_peris}
          setOpenPopup={setopenListeCandidat}
        />
      </PopupFull>
    </>
  );
}
