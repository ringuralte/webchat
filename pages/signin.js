//TODO try switching to functional components and hooks later can't implement a correct fetch method otherwise

import React from "react";
import Router from "next/router";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Link from "next/link";
import Layout from "../components/Layout";
import fetch from "isomorphic-unfetch";

import { storeCTX } from "../components/Store";

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
    },
    linkStyle: {
      textDecoration: "none"
    }
  })
);

const SignIn = () => {
  const classes = useStyles();
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { setUser } = React.useContext(storeCTX);

  const signIn = e => {
    e.preventDefault();
    fetch("http://localhost:5000/api/signIn", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        user: userName,
        password: password
      })
    })
      .then(res => res.json())
      .then(response => {
        if (response.code === 200) {
          setUserName("");
          setPassword("");
          setUser(response.user);
          Router.push("/");
        } else {
          alert(response.code + " " + response.message);
        }
      })
      .catch(err => alert(err));
  };

  return (
    <Layout>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <form className={classes.form} onSubmit={signIn}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="user"
              label="User Name"
              name="userName"
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
          </form>
          <Typography component="main" variant="subtitle1">
            Don't have an account?{" "}
            <Link href="/signup">
              <a className={classes.linkStyle}>Sign Up.</a>
            </Link>
          </Typography>
        </div>
      </Container>
    </Layout>
  );
};

export default SignIn;
