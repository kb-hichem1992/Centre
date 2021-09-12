import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { setSeconds } from "date-fns";

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

export default function LoginForm({ setstate, user, setUser }) {
  const classes = useStyles();

  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");

  // const LoginUser = () => {
  //   const url = `${process.env.REACT_APP_API_URL}/api/getUser/${userName}/${password}`;
  //   fetch(url)
  //     .then((response) => response.json())
  //     .then((json) => {
  //       if (json !== undefined) {
  //         setUser(json);
  //         setstate(true);
  //       } else {
  //         setUser([]);
  //       }
  //     })
  //     .catch(() => {
  //       alert("إسم المستخدم أو كلمة المرور خاطىء");
  //     });
  // };
  const LoginUser = () => {
    const url = `${process.env.REACT_APP_API_URL}/api/getUser/${userName}/${password}`;
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        if (typeof json !== undefined) {
          setUser(json);
          setstate(true);
        }
      })
      .catch(() => {
        alert("إسم المستخدم أو كلمة المرور خاطىء");
      });
  };

  return (
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
            onClick={LoginUser}
          >
            دخول
          </Button>
        </form>
      </div>
    </Container>
  );
}
