import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme =>
  createStyles({
    errorBox: {
      padding: 3,
      background: "rgba(244,67,54,0.2)",
      border: "3px solid #f44336",
      borderRadius: "5px",
      textAlign: "center"
    },
    //bit hacky but don't want the errorbox div to push contents down when
    //display is false
    errorBoxHidden: {
      padding: 3,
      border: "3px solid",
      opacity: 0
    }
  })
);

const Errorbox = props => {
  const classes = useStyles();

  return (
    <Box
      className={
        props.error.display ? classes.errorBox : classes.errorBoxHidden
      }
      color="error.main"
    >
      <Typography variant="body1">
        {props.error.display ? props.error.msg : "opacity be 0"}
      </Typography>
    </Box>
  );
};

export default Errorbox;
