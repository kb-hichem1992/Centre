import React, { useContext, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { UserContext } from "./UserContext";
import Axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiButton-text": {
      fontSize: "100px",
    },
    "& .MuiAlert-message": {
      fontSize: "20px",
    },
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },

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

export default function Profil() {
  const classes = useStyles();
  const { userData } = useContext(UserContext);
  const [openSnack, setOpenSnack] = useState(false);
  const [oldpass, setoldpass] = useState("");
  const [newpass, setnewpass] = useState("");
  const [newpassconfirmation, setnewpassconfirmation] = useState(".");

  const handleClick = () => {
    setOpenSnack(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };
  const updatePasseword = (password, username, admin, numeroAgrement) => {
    Axios.put(process.env.REACT_APP_API_URL + "/update_password", {
      password: password,
      username: username,
      admin: admin,
      numeroAgrement: numeroAgrement,
    }).then(() => {
      handleClick();
    });
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
            تغيير كلمة المرور
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="كلمة السر القديمة"
              autoFocus
              type="password"
              onChange={(e) => {
                setoldpass(e.target.value);
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="كلمة السر الجديدة"
              autoFocus
              type="password"
              onChange={(e) => {
                setnewpass(e.target.value);
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="تأكيد كلمة السر الجديدة"
              autoFocus
              type="password"
              onChange={(e) => {
                setnewpassconfirmation(e.target.value);
              }}
            />

            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={newpass !== newpassconfirmation ? true : false}
              onClick={() => {
                if (oldpass === userData[0].PASSWORD) {
                  updatePasseword(
                    newpass,
                    userData[0].USERNAME,
                    userData[0].ADMIN,
                    userData[0].NUMERO_AGREMENT
                  );
                  window.open("/", "_self" ) 
                } else {
                  alert("كلمة المرور القديمة خاطئة");
                }
              }}
            >
              تأكيد
            </Button>
          </form>
        </div>
      </Container>
      <div className={classes.root}>
        <Snackbar
          open={openSnack}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="info">
            تم تغيير كلمة السر بنجاح{" "}
          </Alert>
        </Snackbar>
      </div>
    </>
  );
}
