import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import { Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import { storeCTX } from "./Store";

const useStyles = makeStyles(theme => ({
  addIcon: {
    width: "75px",
    height: "75px",
    color: "#eeeeff"
  },
  center: {
    margin: "0 auto"
  },
  insideButton: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  createGroupHeader: {
    color: "#eeeeff"
  }
}));

const CreateGroupDialog = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { newLink, setNewLink, user } = React.useContext(storeCTX);

  const [dialogError, setDialogError] = React.useState({
    msg: "",
    display: false
  });
  const [groupName, setGroupName] = React.useState("");

  const enterKeyPress = e => {
    if (e.keyCode == 13) {
      createGroup(e);
    }
  };

  const createGroup = async e => {
    e.preventDefault();
    if (groupName.length < 20) {
      const res = await fetch(`${process.env.API_URL}/api/createGroup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          groupName
        })
      });

      const data = await res.json();
      if (data.code === 200) {
        setNewLink({
          ...newLink,
          [data.id]: { title: groupName, user_id: user }
        });
        setOpen(false);
      } else {
        e.persist();
        setDialogError({
          msg: data.message,
          display: true
        });
      }
      //!TODO do something after creating group
    } else {
      e.persist();
      setDialogError({
        msg: "Group name should not be longer than 20 characters",
        display: true
      });
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
    setGroupName("");
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>
        <div className={classes.insideButton}>
          <AddCircleOutlineIcon className={classes.addIcon} />
          <Typography
            className={classes.createGroupHeader}
            component="h3"
            variant="h6"
          >
            Create A Group
          </Typography>
        </div>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create a new Group</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            error={dialogError.display}
            helperText={dialogError.display ? dialogError.msg : ""}
            id="name"
            label="Enter Group Name"
            value={groupName}
            onKeyDown={enterKeyPress}
            onChange={e => {
              setDialogError(false);
              setGroupName(e.target.value);
            }}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={createGroup} color="primary">
            Create Group
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateGroupDialog;
