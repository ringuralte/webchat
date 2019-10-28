import React from "react";
import Link from "next/link";
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

import { storeCTX } from "./Store";

const drawerWidth = 240;

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: "flex",
      margin: 0,
      padding: 0
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0
      }
    },
    color: {
      backgroundColor: "#282828"
    },
    menuButton: {
      color: "#eeffff"
    },
    drawerPaper: {
      width: drawerWidth
    },
    title: {
      flexGrow: 1
    }
  })
);

const Header = props => {
  const { container } = props;
  const classes = useStyles();
  const { newLink, topic, setTopic } = React.useContext(storeCTX);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  // const [topic, setTopic] = React.useState("");

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  const drawer = (
    <div>
      <Divider />
      <List>
        {Object.keys(newLink).map(key => (
          <ListItem
            button
            key={key}
            onClick={() => {
              setTopic(newLink[key]);
              setMobileOpen(!mobileOpen);
            }}
          >
            <Link href="/p/[id]" as={`/p/${newLink[key].title}`}>
              <ListItemText primary={"#" + newLink[key].title} />
            </Link>
          </ListItem>
        ))}
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
    <div className={classes.root}>
      <AppBar position="sticky" className={classes.color}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            aria-label="menu"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" className={classes.title}>
            Chat App
          </Typography>
          <Typography variant="subtitle2">{topic.title}</Typography>
        </Toolbar>
      </AppBar>
      <nav aria-label="drawer" className={classes.drawer}>
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
  );
};

export default Header;
