import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Copyright from './Copyright'

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    textAlign: "center",
    marginTop: "auto",
  },
}));

const Footer = () => {
  const classes = useStyles();


  return (
    <div className={classes.root}>
      <footer className={classes.footer}>
        <Copyright />
      </footer>
    </div>
  );
};

export default Footer;
