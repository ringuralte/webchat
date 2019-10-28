// !Need to use allChats from the Store and not a react state
import React from "react";
import Router from "next/router";
import Layout from "../../components/Layout";
import Textbox from "../../components/Textbox";
import { storeCTX } from "../../components/Store";

import { createStyles, makeStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

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
      flexDirection: "column",
      minHeight: "90vh"
    },
    chatItems: {
      paddingLeft: 0,
      paddingRight: 0
    },
    chatItemsUser: {
      paddingLeft: 0,
      paddingRight: 0,
      textAlign: "right"
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

const ChatRooms = () => {
  const classes = useStyles();
  const { user, allChats, dispatch, topic } = React.useContext(storeCTX);
  const [loggedInStatus, setLoggedInStatus] = React.useState(false);

  React.useEffect(() => {
    fetch(`http://localhost:5000/api/getChats/${topic.id}`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then(result => {
        if (result.code === 200) {
          dispatch({ type: "FETCH MESSAGE", payload: result.rows });
          setLoggedInStatus(true);
        } else {
          Router.push("/signin");
        }
      });
  }, [topic]);

  let chats;

  //TODO try setting different list style for current user like whatsapp
  if (loggedInStatus) {
    chats = (
      <React.Fragment>
        <List className={classes.chatContainer}>
          {Object.keys(allChats).map(key => {
            if (user === allChats[key].sender) {
              return (
                <ListItem
                  className={classes.chatItemsUser}
                  key={allChats[key].id}
                >
                  <ListItemText primary={`${allChats[key].msg}`} />
                </ListItem>
              );
            } else {
              return (
                <ListItem className={classes.chatItems} key={allChats[key].id}>
                  <ListItemText
                    primary={
                      `${allChats[key].sender}` + ` : ` + `${allChats[key].msg}`
                    }
                  />
                </ListItem>
              );
            }
          })}
        </List>
      </React.Fragment>
    );
  } else {
    chats = <div></div>;
  }

  return (
    <React.Fragment>
      <Layout>
        <Paper square className={classes.paper}>
          {chats}
        </Paper>
      </Layout>
      <Textbox />
    </React.Fragment>
  );
};

// ChatRooms.getInitialProps = async function() {
//   const { topic } = React.useContext(storeCTX);
//   const res = await fetch(`http://localhost:5000/api/getChats/${topic.id}`, {
//     credentials: "include"
//   });
//   const result = await res.json();
//   console.log(result);
// };

export default ChatRooms;
