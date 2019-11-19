import React from "react";
import Router from "next/router";
import Link from "next/link";

import Layout from "../components/Layout";
import { storeCTX } from "../components/Store";

import { createStyles, makeStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import fetch from "isomorphic-unfetch";

const useStyles = makeStyles(theme =>
  createStyles({
    container: {
      paddingTop: "8vh",
      minHeight: "100vh"
    }
  })
);

const Home = () => {
  const classes = useStyles();
  const { newLink, setTopic} = React.useContext(storeCTX);

  React.useEffect(() => {
    fetch("http://localhost:5000/checkToken", { credentials: "include" })
      .then(res => res.json())
      .then(result => {
        if (result.code !== 200) Router.push("/signin");
      });
  }, []);

  return (
    <React.Fragment>
      <Layout>
        <Paper square>
          <List className={classes.container}>
            {Object.keys(newLink).map(key => (
              <ListItem
                button
                key={key}
                onClick={() => {
                  //for the useEffect fetch on [id].js
                  window.localStorage.setItem(
                    "topic",
                    JSON.stringify(newLink[key].id)
                  );
                  window.localStorage.setItem(
                    "title",
                    JSON.stringify(newLink[key].title)
                  );
                  // dispatchTopic({type: "CHANGE TOPIC", payload: newLink[key]})
                  setTopic(newLink[key]);
                }}
              >
                <Link href="/p/[id]" as={`/p/${newLink[key].title}`}>
                  <ListItemText primary={newLink[key].title} />
                </Link>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Layout>
    </React.Fragment>
  );
};

export default Home;
