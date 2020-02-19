import React from "react";
import Router from "next/router";
import Link from "next/link";
// import Cookies from "js-cookie";
import fetch from "isomorphic-unfetch";

import { makeStyles, createStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ExitToApp from "@material-ui/icons/ExitToApp";
import Button from "@material-ui/core/Button";

import { storeCTX } from "./Store";

const drawerWidth = 240;

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      margin: 0,
      padding: 0,
      minHeight: "7vh",
      background: "#292d3e"
    },
    drawerNav: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0
      }
    },
    drawer: {
      backgroundColor: "#181a1b",
      minHeight: "100%",
      color: "#eeeeff"
    },
    appBar: {
      width: "100vw",
      backgroundColor: "#282828"
    },
    menuButton: {
      color: "#eeffff"
    },
    titleBlock: {
      flexGrow: 1
    },
    title: {
      fontWeight: "bold",
      color: "#eeefff"
    },
    drawerPaper: {
      width: drawerWidth
    },
    headerButton: {
      color: "white"
    },
    topDrawer: {
      display: "flex",
      justifyContent: "space-between",
      padding: "15px 5px 15px 5px"
    },
    user: {
      display: "flex"
    },
    iconColor: {
      color: "limegreen"
    },
    signOut: {
      display: "flex",
      backgroundColor: "inherit",
      color: "#ff5370"
    }
  })
);

const Header = props => {
  const { container } = props;
  const classes = useStyles();
  const { newLink, topic, setTopic, user, setUser } = React.useContext(
    storeCTX
  );
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // so that topic state will be preserved on refresh
  React.useEffect(() => {
    let truncatedTopic = JSON.parse(window.localStorage.getItem("topic"));
    if (truncatedTopic) {
      if (truncatedTopic.length > 7) {
        setTopic(`${truncatedTopic.substring(0, 7)}...`);
      } else {
        setTopic(truncatedTopic);
      }
    }
    let truncatedName = window.localStorage.getItem("user");
    //incase username is too long add ...'s after 10 characters
    if (truncatedName) {
      if (truncatedName.length > 10) {
        setUser(`${truncatedName.substring(0, 10)}...`);
      } else {
        setUser(truncatedName);
      }
    } else {
      setUser("");
    }
  }, []);

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  const signOut = async e => {
    e.preventDefault();
    const res = await fetch(`${process.env.API_URL}/api/signOut`, {
      method: "get",
      credentials: "include"
    });

    const data = await res.json();
    if (data.code === 200) {
      window.localStorage.removeItem("topic");
      window.localStorage.removeItem("user");
      setTopic("");
      Router.push("/");
    }
  };

  //only show topics and top drawer if user is logged in
  let topDrawer;
  let topics;

  if (user) {
    topDrawer = (
      <div className={classes.topDrawer}>
        <span className={classes.user}>
          <AccountCircle className={classes.iconColor} />
          {user}
        </span>
        <button className={classes.signOut} onClick={signOut}>
          Sign Out <ExitToApp />
        </button>
      </div>
    );
  }

  if (user) {
    topics = Object.keys(newLink).map(key => (
      <ListItem
        button
        key={key}
        onClick={() => {
          window.localStorage.setItem(
            "topic",
            JSON.stringify(newLink[key].title)
          );
          setTopic(newLink[key]);
          setMobileOpen(!mobileOpen);
        }}
      >
        <Link href="/p/[id]" as={`/p/${newLink[key].title}`}>
          <ListItemText primary={"#" + newLink[key].title} />
        </Link>
      </ListItem>
    ));
  }

  const drawer = (
    <div className={classes.drawer}>
      {topDrawer}
      <Divider />
      <List>
        {topics}
        <ListItem button>
          <Link href="/signin">
            <ListItemText primary={"#" + "signin"} />
          </Link>
        </ListItem>
        <ListItem button>
          <Link href="/signup">
            <ListItemText primary={"#" + "signup"} />
          </Link>
        </ListItem>
      </List>
    </div>
  );

  return (
    <>
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              aria-label="menu"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <div className={classes.titleBlock}>
              <Link href="/">
                <Button>
                  <Typography
                    component="h1"
                    variant="h5"
                    className={classes.title}
                  >
                    Chat App
                  </Typography>
                </Button>
              </Link>
            </div>
            <Typography variant="subtitle2">{topic}</Typography>
          </Toolbar>
        </AppBar>
        <nav aria-label="drawer" className={classes.drawerNav}>
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper
              }}
              ModalProps={{
                keepMounted: true
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
      </div>
    </>
  );
};

export default Header;
