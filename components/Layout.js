import Header from "./Header";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh"
    }
  })
);

const Layout = props => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Header />
      {props.children}
    </div>
  );
};

export default Layout;
