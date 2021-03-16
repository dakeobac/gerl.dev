import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DarkModeButton from "./DarkModeButton";
import { Link } from "gatsby-theme-material-ui";

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: 2,
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
    color: theme.palette.text.primary
  },
  toolbarSecondary: {
    justifyContent: "space-between",
    overflowX: "auto",
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
    color: theme.palette.text.primary

    
  },
}));

const Header = () => {
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
        <Link to="/" className={classes.toolbarLink}>
          <Typography
            className={classes.toolbarTitle}
            component="h1"
            variant="h4"
          >
            {data.site.siteMetadata.title}
          </Typography>
        </Link>
        <DarkModeButton />
      </Toolbar>
      <Toolbar className={classes.toolbarSecondary}>
        <Link to="/" className={classes.toolbarLink}>
          <Typography>Home</Typography>
        </Link>
        <Link to="/about" className={classes.toolbarLink}>
          <Typography>About</Typography>
        </Link>
        <Link to="/contact" className={classes.toolbarLink}>
          <Typography>Contact</Typography>
        </Link>
        <Link to="/blog" className={classes.toolbarLink}>
          <Typography>Blog</Typography>
        </Link>
      </Toolbar>
    </header>
  );
};

export default Header;
