// TODO update header and home page on creating new group
// TODO make fetch requests async and await for all
import React from "react";
import Router from "next/router";
import Link from "next/link";

import CreateGroupDialog from "../components/CreateGroupDialog";
import Layout from "../components/Layout";
import { storeCTX } from "../components/Store";

import Container from "@material-ui/core/Container";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import fetch from "isomorphic-unfetch";
import { Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      position: "relative",
      height: "100%"
    },
    main: {
      minWidth: "100%",
      minHeight: "100%",
      [theme.breakpoints.down("sm")]: {
        marginTop: theme.spacing(0)
      },
      color: "#ffcb6b",
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      border: "1px solid black",
      backgroundColor: "#292d3e"
    },
    progressCircle: {
      position: "fixed",
      top: "50%",
      left: "50%"
    },
    title: {
      paddingTop: "20px"
    }
  })
);

const Home = () => {
  const classes = useStyles();
  const { newLink, setTopic } = React.useContext(storeCTX);
  const [loader, setLoader] = React.useState(false);

  //check for jwt token to see if user is logged in if false send to signin page
  React.useEffect(() => {
    const checkToken = async () => {
      setLoader(false);
      const res = await fetch(`${process.env.API_URL}/api/checkToken`, {
        credentials: "include"
      });
      const data = await res.json();
      if (data.code !== 200) {
        window.localStorage.removeItem("topic");
        window.localStorage.removeItem("user");
        Router.push("/signin");
      } else {
        //basically just in case someone deleted their localstorage but cookies are still intact
        window.localStorage.setItem("user", data.user);
        setLoader(true);
      }
    };
    checkToken();
  }, []);

  React.useEffect(() => {
    setTopic("");
  }, []);

  return (
    <Layout>
      <div className={classes.root}>
        <Container className={classes.main} component="main" maxWidth="xs">
          {loader ? (
            <React.Fragment>
              <Typography className={classes.title} component="h1" variant="h4">
                Just Another Chat App
              </Typography>
              <CreateGroupDialog />
              <List>
                {Object.keys(newLink).map(key => (
                  <ListItem
                    button
                    key={key}
                    onClick={() => {
                      //for the useEffect fetch on [id].js
                      window.localStorage.setItem(
                        "topic",
                        JSON.stringify(newLink[key].title)
                      );
                    }}
                  >
                    <Link href="/p/[id]" as={`/p/${newLink[key].title}`}>
                      <ListItemText primary={newLink[key].title} />
                    </Link>
                  </ListItem>
                ))}
              </List>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <CircularProgress className={classes.progressCircle} />
            </React.Fragment>
          )}
        </Container>
      </div>
    </Layout>
  );
};

export default Home;
