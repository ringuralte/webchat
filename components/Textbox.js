//TODO put sendChatAction here and return a legit value to the reducer
import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";

import { storeCTX } from "../components/Store";

const useStyles = makeStyles(() =>
  createStyles({
    chatButton: {
      width: "10%"
    },
    chatBox: {
      width: "90%"
    },
    type: {
      display: "flex",
      width: "100%",
      alignItems: "center",
      justifyContent: "center"
    },
    bar: {
      backgroundColor: "rgb(255,255,255)",
      top: "auto",
      bottom: 0
    }
  })
);

const Textbox = () => {
  const classes = useStyles();
  const { sendChatAction, user, topic } = React.useContext(storeCTX);

  const enterKeyPress = e => {
    if (e.keyCode == 13) {
      handleSubmit(e);
    }
  };
  const [textValue, changeTextValue] = React.useState("");

  const handleSubmit = e => {
    e.preventDefault();
    fetch("http://localhost:5000/api/postChat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        topic: topic.id,
        sender: user,
        msg: textValue
      })
    })
      .then(res => res.json())
      .then(chat => {
        if (chat.code === 401) {
          alert(chat.message);
          changeTextValue("");
        } else {
          sendChatAction({
            id: chat.id,
            sender: user,
            msg: textValue
          });
          changeTextValue("");
        }
      });
  };

  return (
    <AppBar position="fixed" className={classes.bar}>
      <ToolBar className={classes.type}>
        <TextField
          className={classes.chatBox}
          label="Send a chat"
          onKeyDown={enterKeyPress}
          value={textValue}
          onChange={e => changeTextValue(e.target.value)}
        />
        <Button
          className={classes.chatButton}
          variant="contained"
          color="secondary"
          onClick={handleSubmit}
        >
          Send
        </Button>
      </ToolBar>
    </AppBar>
  );
};

export default Textbox;
