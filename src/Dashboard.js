import React, { useContext } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import LaptopChromebookIcon from "@material-ui/icons/LaptopChromebook";
import AppOp from "./Tables/AppOp.js";
import AppFor from "./Formation/Formation.js";
import AppCand from "./Candidat/Candidat.js";
import AppVeh from "./Table_vehicule//AppVeh.js";
import Button from "./components/controls/Button";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import GroupIcon from "@material-ui/icons/Group";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import AppBrevet from "./Brevet/Brevet.js";
import { UserContext } from "./UserContext";
import Profil from "./Profil";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SearchTable from "./Formation/Search.js";
import SearchIcon from "@material-ui/icons/Search";

const drawerWidth = 180;

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiAppBar-colorPrimary": {
      backgroundColor: "#1e81b0",
    },
    display: "flex",
  },
  link: {
    textDecoration: "none",
    color: theme.palette.text.primary,
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  title: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  container: {
    margin: theme.spacing(1),
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function Dashboard() {
  const { userData, setstate, setuserData } = useContext(UserContext);
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const numeroAgrement = userData[0].NUMERO_AGREMENT;

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    // the Appbar Starts from here
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          color="Primary"
          className={clsx(classes.appBar, open && classes.appBarShift)}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h4"
              color="inherit"
              noWrap
              className={classes.title}
            >
              مركز رقم {numeroAgrement}
            </Typography>
            <Button
              text="خروج"
              color="inherit"
              variant="outlined"
              size="small"
              onClick={() => {
                setuserData([]);
                setstate(false);
              }}
            />
          </Toolbar>
        </AppBar>
        {/* the side bar starts from here */}
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            <Link to="/" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <SearchIcon />
                </ListItemIcon>
                <ListItemText primary="البحث" />
              </ListItem>
            </Link>
            <Link to="/candidat" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText primary="المنرشحين" />
              </ListItem>
            </Link>
            <Link to="/For" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <LaptopChromebookIcon />
                </ListItemIcon>
                <ListItemText primary="الدورات" />
              </ListItem>
            </Link>
            <Link to="/Diplômes" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <LibraryBooksIcon />
                </ListItemIcon>
                <ListItemText primary="الشهادات" />
              </ListItem>
            </Link>
          </List>
          <Divider />
          <Link to="/Profile" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="الحساب" />
            </ListItem>
          </Link>
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid item xs={12}>
              <Switch>
                <Route path="/" exact render={() => <SearchTable />} />
                <Route path="/op/mor">
                  <AppOp
                    id={process.env.REACT_APP_API_URL + "/api/get_op/mor"}
                    Title={"Liste des opérateurs/Personne Morale"}
                  />
                </Route>
                <Route
                  path="/op/phy"
                  render={(props) => (
                    <AppOp
                      {...props}
                      id={process.env.REACT_APP_API_URL + "/api/get_op/phy"}
                      Title={"Liste des opérateurs/Personne Physique"}
                    />
                  )}
                />
                <Route
                  path="/for"
                  render={(props) => (
                    <AppFor
                      {...props}
                      id={
                        process.env.REACT_APP_API_URL +
                        "/api/get_form/" +
                        numeroAgrement
                      }
                    />
                  )}
                />
                <Route
                  path="/candidat"
                  render={(props) => (
                    <AppCand
                      {...props}
                      id={process.env.REACT_APP_API_URL + "/api/get_candidat"}
                    />
                  )}
                />
                <Route
                  path="/Vehicule"
                  render={(props) => (
                    <AppVeh
                      {...props}
                      id={process.env.REACT_APP_API_URL + "/api/get_veh_Mar"}
                      id2={process.env.REACT_APP_API_URL + "/api/get_veh_voyag"}
                    />
                  )}
                />
                <Route
                  path="/Diplômes"
                  render={(props) => (
                    <AppBrevet
                      {...props}
                      id={`${process.env.REACT_APP_API_URL}/api/get_brevet/${numeroAgrement}`}
                    />
                  )}
                />
                <Route path="/Profile" render={(props) => <Profil />} />
              </Switch>
            </Grid>
          </Container>
        </main>
      </div>
    </Router>
  );
}
