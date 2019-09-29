const SignIn = () => {
  const classes = useStyles();
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");

  const signIn = () => {
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
      .then(response => alert(response.code + response.message))
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

