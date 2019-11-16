import React from "react";
import Router from "next/router";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Layout from "../components/Layout";
import fetch from "isomorphic-unfetch";

import { storeCTX } from "../components/Store";
import Errorbox from "../components/Errorbox";

const useStyles = makeStyles(theme =>
  createStyles({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1)
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    }
  })
);

const SignUp = () => {
  const classes = useStyles();
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const { error, setError } = React.useContext(storeCTX);

  const signUp = e => {
    e.preventDefault();
    if (password === confirmPassword) {
      fetch("http://localhost:5000/api/signUp", {
        method: "POST",
        body: JSON.stringify({
          user: userName,
          password: password
        }),
        headers: { "Content-Type": "application/json" }
      })
        .then(res => res.json())
        .then(response => {
          if (response.code === 400) {
            setError(response.msg);
          } else if (response.code === 200) {
            Router.push("/");
          }
        })
        .catch(err => alert(err.message));
    } else {
      setError("Password does not match");
    }
    setUserName("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <Layout>
      <Container component="main" maxWidth="xs">
        <Errorbox error={error} />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form className={classes.form} onSubmit={signUp}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="user"
              label="User Name"
              name="user"
              autoFocus
              value={userName}
              onChange={e => setUserName(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="password"
              id="password"
              label="Password"
              name="password"
              autoFocus
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="password"
              id="confirm password"
              label="Confirm Password"
              name="password"
              autoFocus
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              // onClick={() => {
              //   signUp();
              // }}
            >
              Sign Up
            </Button>
          </form>
        </div>
      </Container>
    </Layout>
  );
};

export default SignUp;
