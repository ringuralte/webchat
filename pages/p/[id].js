// !Need to use allChats from the Store and not a react state
import React from "react";
import Router from "next/router";
import Layout from "../../components/Layout";
import Textbox from "../../components/Textbox";
import { storeCTX } from "../../components/Store";

import { createStyles, makeStyles } from "@material-ui/core/styles";

import ScrollToBottom from "react-scroll-to-bottom";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Cookies from "js-cookie";

import fetch from "isomorphic-unfetch";
import { Typography } from "@material-ui/core";

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
      minHeight: "90vh",
      background: "#292d3e"
    },
    chatItems: {
      paddingLeft: 0,
      paddingRight: "25vw",
      color: "#ffcb6b"
    },
    chatItemsUser: {
      paddingLeft: "25vw",
      paddingRight: 0,
      textAlign: "right",
      color: "#84ffff"
    },
    senderName: {
      color: "#f07178"
    },
    paper: {
      paddingBottom: 50,
      paddingTop: 100
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
  const { allChats, dispatch, topic } = React.useContext(storeCTX);
  const [loggedInStatus, setLoggedInStatus] = React.useState(false);
  const user = Cookies.get("user");
  const scrollRef = React.useRef(null);

  const scrollView = () => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(scrollView, [allChats]);

  React.useEffect(scrollView);

  //ran when going to a new group by clicking on header topics
  React.useEffect(() => {
    fetch(
      `http://localhost:5000/api/getChats/${window.localStorage.getItem(
        "topic"
      )}`,
      {
        credentials: "include"
      }
    )
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

  if (loggedInStatus) {
    chats = (
      <React.Fragment>
        <List className={classes.chatContainer} id="chatContainer">
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
                      <React.Fragment>
                        <Typography
                          className={classes.senderName}
                          component="span"
                        >
                          {`${allChats[key].sender}` + ` : `}
                        </Typography>
                        <Typography component="span">{`${allChats[key].msg}`}</Typography>
                      </React.Fragment>
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
          <div ref={scrollRef} />
          <Textbox />
        </Paper>
      </Layout>
    </React.Fragment>
  );
};

export default ChatRooms;
