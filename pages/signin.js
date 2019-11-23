//TODO try switching to functional components and hooks later can't implement a correct fetch method otherwise

import React from "react";
import Router from "next/router";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import Link from "next/link";
import fetch from "isomorphic-unfetch";

import Layout from "../components/Layout";
import Errorbox from "../components/Errorbox";

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      width: "100vw",
      position: "relative",
      background: "linear-gradient(135deg, #eeffff, #00bbcc)",
      height: "100vh"
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
    },
    container: {
      paddingTop: "8vh"
    },
    curve: {
      position: "absolute",
      bottom: 0,
      width: "100%"
    },
    curve2: {
      position: "absolute",
      bottom: 10,
      width: "100%"
    },
    path: {
      fill: "#0ff",
    },
    path2: {
      fill: "#0bf"
    }
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
    fetch("/api/signIn", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
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
          setError({msg: response.msg, display: true});
        }
      })
      .catch(err => alert(err));
  };

  return (
    <Layout>
      <div className={classes.root}>
        <Container className={classes.container} component="main" maxWidth="xs">
          <Errorbox error={error}/>
          <div className={classes.main}>
            <Typography className={classes.title} component="h1" variant="h5">
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
        <svg className={classes.curve2} viewBox="0 0 2391 378" xmlns="http://www.w3.org/2000/svg">
          <path className={classes.path2}
                d="M343.937 124.55C165.147 -23.9495 40.8167 206.775 1 340.7V377L2390 366.275V296.15C2336.7 213.1 2205.05 45.1854 2104.86 37.9254C1979.63 28.8505 1817.8 98.9754 1698.35 218.6C1578.9 338.225 1336.14 304.4 1334.22 304.4C1189.72 318.425 1191.65 118.775 1025.96 18.1255C860.269 -82.5244 779.352 292.85 742.746 304.4C706.14 315.95 538.525 306.05 343.937 124.55Z"/>
        </svg>
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
