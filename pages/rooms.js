import React from "react";
import { useRouter } from "next/router";
import { createStyles, makeStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import Textbox from "../components/Textbox";
import Layout from "../components/Layout";
import { storeCTX } from "../components/Store";

import fetch from "isomorphic-unfetch";

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1
    },
    chatContainer: {
      padding: "1rem",
      display: "flex",
      flexDirection: "column"
    },
    paper: {
      paddingBottom: 50
    },
    chat: {
      flexGrow: 1
    },
    text: {
      padding: theme.spacing(2, 2, 0)
    }
  })
);

const Rooms = props => {
  const classes = useStyles();
  const router = useRouter();
  // const { allChats } = React.useContext(storeCTX);
  const [allChats, getChats] = React.useState("");

  React.useEffect(() => {
    fetch("http://localhost:5000/checkToken", { credentials: "include" })
      .then(res => res.json())
      .then(result => {
        if (result.code !== 200) Router.push("/signin");
      });
  }, []);

  React.useEffect(() => {
    fetch(`http://localhost:5000/api/getChats`, { credentials: "include" })
      .then(res => res.json())
      .then(result => {
        getChats(result.rows);
      });
  }, []);
  // console.log(chats);
  console.log(router.query.title);

  return (
    <React.Fragment>
      <Layout>
        <h1>{router.query.title}</h1>
        <Paper square className={classes.paper}>
          <List className={classes.chatContainer}>
            {Object.keys(allChats).map(key => (
              <ListItem key={allChats[key].id}>
                <ListItemText primary={allChats[key].sender} />
                <ListItemText primary={allChats[key].msg} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Layout>
      <Textbox />
    </React.Fragment>
  );
};

export default Rooms;
