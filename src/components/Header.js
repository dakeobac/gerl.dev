import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DarkModeButton from "./DarkModeButton";
import { Link } from "gatsby-theme-material-ui";
import useTheme from "@material-ui/core/styles/useTheme";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    marginBottom: theme.spacing(2),
  },
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    justifyContent: "space-between",
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: "space-between",
    overflowX: "auto",
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}));

const Header = () => {
  const theme = useTheme();
  const classes = useStyles();
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <header className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <Link to="/" className={classes.toolbarLink} color={theme.palette.type === "dark" ? "secondary" : "primary"} >
          <Typography
            className={classes.toolbarTitle}
            component="h1"
            variant="h4"
            color="textPrimary"
            
          >
            {data.site.siteMetadata.title}
          </Typography>
        </Link>
        <DarkModeButton />
      </Toolbar>
      <Toolbar className={classes.toolbarSecondary}>
        <Link to="/" className={classes.toolbarLink} color={theme.palette.type === "dark" ? "secondary" : "primary"}>
          <Typography color="textPrimary">Home</Typography>
        </Link>
        <Link to="/about" className={classes.toolbarLink} color={theme.palette.type === "dark" ? "secondary" : "primary"}>
          <Typography color="textPrimary">About</Typography>
        </Link>
        <Link to="/contact" className={classes.toolbarLink} color={theme.palette.type === "dark" ? "secondary" : "primary"}>
          <Typography color="textPrimary">Contact</Typography>
        </Link>
        <Link to="/blog" className={classes.toolbarLink} color={theme.palette.type === "dark" ? "secondary" : "primary"}>
          <Typography color="textPrimary">Blog</Typography>
        </Link>
      </Toolbar>
    </header>
  );
};

export default Header;
