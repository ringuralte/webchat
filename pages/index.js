import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import Textbox from "../components/Textbox";
import Layout from "../components/Layout";
import { storeCTX } from "../components/Store";

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

const Home = () => {
  const classes = useStyles();
  const { allChats, sendChatAction } = React.useContext(storeCTX);

  const topic = Object.keys(allChats);

  const [msg] = React.useState(topic[0]);

  return (
    <React.Fragment>
      <Layout>
        <Paper square className={classes.paper}>
          <List className={classes.chatContainer}>
            {allChats[msg].map(key => (
              <ListItem key={key}>
                <ListItemText primary={key.sender} />
                <ListItemText primary={key.msg} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Layout>
      <Textbox msg={msg} sendChatAction={sendChatAction} topic={topic} />
    </React.Fragment>
  );
};

export default Home;
