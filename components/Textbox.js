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
  const { sendChatAction, user } = React.useContext(storeCTX);
  // const user = window.localStorage.getItem("user");
  const [lengthError, setLengthError] = React.useState(false);
  const [helperText, setHelperText] = React.useState("");

  const enterKeyPress = e => {
    if (e.keyCode == 13) {
      handleSubmit(e);
    }
  };
  const [textValue, changeTextValue] = React.useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    //didn't include sender name in post request cause it uses cookie
    //doing the check at client side but if someone somehow manages to send it still checking it server side

    if (textValue.length < 1000) {
      const res = await fetch(`${process.env.API_URL}/api/postChat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          topic: window.localStorage.getItem("topic"),
          msg: textValue
        })
      });
      const data = await res.json();
      if (data.code === 200) {
        sendChatAction({
          id: data.id,
          sender: window.localStorage.getItem("user"),
          msg: textValue
        });
        changeTextValue("");
      } else {
        e.persist();
        setHelperText(data.message);
        setLengthError(true);
      }
    } else {
      e.persist();
      setHelperText("Message too long < 1000 you are at ");
      setLengthError(true);
    }
  };

  return (
    <AppBar position="fixed" className={classes.bar}>
      <ToolBar className={classes.type}>
        <TextField
          className={classes.chatBox}
          error={lengthError}
          id="standard-error-helper-text"
          helperText={lengthError ? `${helperText}${textValue.length} ` : ""}
          label="Send a chat"
          onKeyDown={enterKeyPress}
          value={textValue}
          onChange={e => {
            setLengthError(false);
            changeTextValue(e.target.value);
          }}
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
