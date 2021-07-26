import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

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


  useEffect(() => {
    fetch(`https://transport-app-server.herokuapp.com/api/getUser/${userName}/${password}`)
      .then((response) => response.json())
      .then((json) => setUser(json));
  }, [userName, password, setUser]);




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
            onClick={() => {
              if(Object.keys(user).length !== 0){
                setstate(true)
              }else{
                alert('إسم المستخدم أو الرقن السري خاطئ')
              }
            }}
          >
            دخول
          </Button>
        </form>
      </div>
    </Container>
  );
}
