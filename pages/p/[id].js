// !Need to use allChats from the Store and not a react state
import React from "react";
import Router from "next/router";
import Layout from "../../components/Layout";
import Textbox from "../../components/Textbox";
import { storeCTX } from "../../components/Store";

import { createStyles, makeStyles } from "@material-ui/core/styles";

import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import CircularProgress from "@material-ui/core/CircularProgress";

import fetch from "isomorphic-unfetch";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
      paddingBottom: 50
    },
    main: {
      [theme.breakpoints.down("sm")]: {
        marginTop: theme.spacing(2)
      },
      marginTop: theme.spacing(8)
    },
    chatContainer: {
      padding: "1rem",
      display: "flex",
      flexDirection: "column",
      minHeight: "85vh",
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
    chat: {
      flexGrow: 1
    },
    text: {
      padding: theme.spacing(2, 2, 0)
    },
    progressCircle: {
      position: "fixed",
      top: "50%",
      left: "50%",
      color: "white"
    }
  })
);

const ChatRooms = () => {
  const classes = useStyles();
  const { allChats, dispatch, topic, setTopic, user } = React.useContext(
    storeCTX
  );
  const [loader, setLoader] = React.useState(false);
  // const user = Cookies.get("user");
  // const user = window.localStorage.getItem("user");
  const scrollRef = React.useRef(null);

  //!TODO the pages load to scroll bottom even when there is not enough
  //chat items and since the container have min-height of 100vh

  const scrollViewOnSend = () => {
    scrollRef.current.scrollIntoView();
  };

  const scrollViewOnLoad = () => {
    scrollRef.current.scrollIntoView();
  };

  //when component mounts
  React.useEffect(scrollViewOnLoad);

  //when component is updated
  React.useEffect(scrollViewOnSend, [allChats]);

  //ran when going to a new group by clicking on header topics
  React.useEffect(() => {
    setLoader(false);
    const getChats = async () => {
      const res = await fetch(
        `${process.env.API_URL}/api/getChats/${window.localStorage.getItem(
          "topic"
        )}`,
        {
          credentials: "include"
        }
      );
      const data = await res.json();
      if (data.code === 200) {
        dispatch({ type: "FETCH MESSAGE", payload: data.chats });
        setLoader(true);
      } else {
        setTopic("");
        Router.push("/signin");
      }
    };
    getChats();
  }, [topic]);

  let chats;

  //check if user otherwise blank page
  if (loader) {
    chats = (
      // user chats goes right aligned
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
              // other users appear on left
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
    chats = (
      <div className={classes.chatContainer}>
        <CircularProgress className={classes.progressCircle} />
      </div>
    );
  }

  return (
    <React.Fragment>
      <Layout>
        <div className={classes.root}>
          {chats}
          {/* ref is for auto scroll to bottom for send and load */}
          <div ref={scrollRef} />
          <Textbox />
        </div>
      </Layout>
    </React.Fragment>
  );
};

export default ChatRooms;
