import React from "react";
import fetch from "isomorphic-unfetch";

import { makeStyles, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";

import { storeCTX } from "./Store";

const useStyles = makeStyles(theme =>
  createStyles({
    groupDialog: {
      color: "#eeeeff",
      textTransform: "none"
    },
    deleteGroupButton: {
      backgroundColor: "hotpink"
    },
    error: {
      display: "block"
    },
    none: {
      display: "none"
    }
  })
);

const DeleteDialog = () => {
  const classes = useStyles();
  const { topic } = React.useContext(storeCTX);
  const [dialogContent, setDialogContent] = React.useState({
    topic: "",
    creator: ""
  });
  const [dialogError, setDialogError] = React.useState({
    msg: "",
    display: false
  });
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = e => {
    e.preventDefault();
    if (topic === "") {
      e.persist();
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    setDialogContent({
      topic: JSON.parse(window.localStorage.getItem("topic")),
      creator: JSON.parse(window.localStorage.getItem("creator"))
    });
  }, [topic]);

  const handleDelete = async e => {
    e.preventDefault();
    const res = await fetch(`${process.env.API_URL}/api/deleteGroup`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        title: dialogContent.topic,
        creator: dialogContent.creator
      })
    });
    const data = await res.json();
    if (data.code === 200) {
      window.location.href = "/";
      // Router.push("/"); want to force a full reload instead
    } else if (data.code === 401) {
      setDialogError({
        msg: data.message,
        display: true
      });
    }
  };

  return (
    <>
      <Button
        color="secondary"
        className={classes.groupDialog}
        onClick={handleClickOpen}
      >
        {topic}
      </Button>
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">
          {dialogContent.topic}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Created by {dialogContent.creator}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            className={classes.deleteGroupButton}
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
          >
            Delete
          </Button>
          <Button variant="contained" onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
        <Typography
          color="error"
          variant="subtitle2"
          className={dialogError.display ? classes.error : classes.none}
        >
          {dialogError.msg}
        </Typography>
      </Dialog>
    </>
  );
};

export default DeleteDialog;
