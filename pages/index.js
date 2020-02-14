// TODO update header and home page on creating new group
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

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      width: "100vw",
      position: "relative",
      minHeight: "100vh"
    },
    main: {
      [theme.breakpoints.down("sm")]: {
        marginTop: theme.spacing(2)
      },
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }
  })
);

const Home = () => {
  const classes = useStyles();
  const { newLink, setTopic } = React.useContext(storeCTX);

  React.useEffect(() => {
    fetch("http://localhost:5000/api/checkToken", { credentials: "include" })
      // fetch("https://fast-oasis-98847.herokuapp.com/api/checkToken", {
      //   credentials: "include"
      // })
      .then(res => res.json())
      .then(result => {
        if (result.code !== 200) Router.push("/signin");
      });
  }, []);

  React.useEffect(() => {
    setTopic("");
  }, []);

  return (
    <Layout>
      <div className={classes.root}>
        <Container className={classes.main} component="main" maxWidth="xs">
          <Typography className={classes.title} component="h1" variant="h5">
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
        </Container>{" "}
      </div>
    </Layout>
  );
};

export default Home;
