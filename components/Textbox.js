import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";

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

const Textbox = (props) => {
  const classes = useStyles();

  const enterKeyPress = (e) => {
    if (e.keyCode == 13) {
      props.sendChatAction({
        sender: "merandom",
        msg: textValue,
        topic: props.topic
      });
      changeTextValue("");
    }
  };
  const [textValue, changeTextValue] = React.useState("");

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
          onClick={() => {
            props.sendChatAction({
              sender: "merandom",
              msg: textValue,
              topic: props.topic
            });
            changeTextValue("");
          }}
        >
          Send
        </Button>
      </ToolBar>
    </AppBar>
  );
};

export default Textbox;