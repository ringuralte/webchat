//TODO try switching to functional components and hooks later can't implement a correct fetch method otherwise

import React from "react";
import Router from "next/router";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Link from "next/link";
import fetch from "isomorphic-unfetch";

import Layout from "../components/Layout";
import Errorbox from "../components/Errorbox";

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      width: "100vw",
      position: "relative",
      background: "linear-gradient(135deg, #eeffff, #00bbee)",
      height: "80vh"
    },
    main: {
      [theme.breakpoints.down("sm")]: {
        marginTop: theme.spacing(2)
      },
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
      textDecoration: "none",
      color: "#eeffff"
    },
    container: {},
    curve: {
      position: "absolute",
      bottom: 0,
      width: "100%"
    },
    path: {
      fill: "#0ff"
    }
    // notchedOutline: {
    //   borderWidth: "1px",
    //   borderColor: "white"
    // },
    // focused: {
    //   "&notchedOutline": {
    //     borderColor: "white"
    //   }
    // }
  })
);

const SignIn = () => {
  const classes = useStyles();
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [error, setError] = React.useState({
    msg: "",
    display: false
  });

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
          Router.push("/");
        } else {
          setError({ msg: response.msg, display: true });
        }
      })
      .catch(err => alert(err));
  };

  return (
    <Layout>
      <div className={classes.root}>
        <Container className={classes.container} component="main" maxWidth="xs">
          <Errorbox error={error} />
          <div className={classes.main}>
            <Typography className={classes.title} component="h1" variant="h5">
              Sign In
            </Typography>
            <form className={classes.form} onSubmit={signIn}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                // InputProps={{
                //   classes: {
                //     notchedOutline: classes.notchedOutline
                //   }
                // }}
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
                className={classes.submit}
                color="primary"
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
        <svg className={classes.curve} viewBox="0 0 1416.99 174.01">
          <path
            className={classes.path}
            d="M0,280.8S283.66,59,608.94,163.56s437.93,150.57,808,10.34V309.54H0V280.8Z"
            transform="translate(0 -135.53)"
          />
        </svg>
      </div>
    </Layout>
  );
};

export default SignIn;
