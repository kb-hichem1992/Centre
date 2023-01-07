import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Popup from "./components/Popup";
import Register from "./Register";
import axios from "axios";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

require("es6-promise").polyfill();
require("isomorphic-fetch");

export default function LoginForm({ setisLogedIn, setUser, setSide }) {
  const classes = useStyles();

  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setmessage] = useState("");
  const [etablissement, setEtablissement] = useState("مركز");

  const login = () => {
    if (etablissement === "مركز") {
      axios
        .post(process.env.REACT_APP_API_URL + "/login_centre", {
          username: userName,
          password: password,
        })
        .then((response) => {
          if (response.data.message) {
            setmessage(response.data.message);
          } else {
            setUser(response.data[0]);
            setSide(etablissement);
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("user", response.data[0].NUMERO_AGREMENT);
            localStorage.setItem("typeUser", response.data[0].ADMIN);
            localStorage.setItem("side", etablissement);
            localStorage.setItem("pass", response.data[0].PASSWORD);
            localStorage.setItem("username", response.data[0].USERNAME);
            setisLogedIn(true);
            window.open("/Center", "_self");
          }
        });
    }
    if (etablissement === "marchandise" || etablissement === "formation") {
      axios
        .post(process.env.REACT_APP_API_URL + "/login_service", {
          username: userName,
          password: password,
          service: etablissement,
        })
        .then((response) => {
          if (response.data.message) { 
            
            setmessage(response.data.message);
          } else {
            setUser(response.data[0]);
            setSide(etablissement);
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("user", response.data[0].SERVICE);
            localStorage.setItem("typeUser", response.data[0].TYPE);
            localStorage.setItem("side", etablissement);
            localStorage.setItem("pass", response.data[0].PASSWORD);
            localStorage.setItem("username", response.data[0].USERNAME);
            setisLogedIn(true);
            window.open("/" + etablissement, "_self");
          }
        });
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            تسجيل
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="إسم المستخدم"
              autoFocus
              onChange={(e) => {
                setuserName(e.target.value);
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="الرقم السري"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={login}
            >
              دخول
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => {
                setOpen(true);
              }}
            >
              تسجيل
            </Button>
            <FormControl component="fieldset">
              <FormLabel component="legend">المؤسسة</FormLabel>
              <RadioGroup
                row
                aria-label="الجنس"
                name="gender1"
                value={etablissement}
                className={classes.group}
                onChange={(e) => {
                  setEtablissement(e.target.value);
                }}
              >
                <FormControlLabel
                  value="مركز"
                  control={<Radio />}
                  label="مركز"
                />
                <FormControlLabel
                  value="marchandise"
                  control={<Radio />}
                  label="المديرية - البضائع"
                />
                <FormControlLabel
                  value="formation"
                  control={<Radio />}
                  label="المديرية - التكوين"
                />
              </RadioGroup>
            </FormControl>
          </form>
          <Typography color="textPrimary" variant="h6" paragraph={true}>
            {message}
          </Typography>
        </div>
      </Container>
      <Popup title="Register" openPopup={open} setOpenPopup={setOpen}>
        <Register etablissement={etablissement} Close={setOpen} />
      </Popup>
    </>
  );
}
