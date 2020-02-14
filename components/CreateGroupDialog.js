import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

const useStyles = makeStyles(theme => ({
  addIcon: {
    width: "100px",
    height: "100px"
  },
  center: {
    margin: "0 auto"
  },
  insideButton: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
}));

const CreateGroupDialog = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [groupName, changeGroupName] = React.useState("");

  const createGroup = () => {
    // alert(groupName);
    fetch("http://localhost:5000/api/createGroup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        groupName
      })
    });
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>
        <div className={classes.insideButton}>
          <AddCircleOutlineIcon className={classes.addIcon} />
          <Typography component="h2" variant="h6">
            Create Group
          </Typography>
        </div>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create Group</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Enter Group Name"
            value={groupName}
            onChange={e => changeGroupName(e.target.value)}
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
