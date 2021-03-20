import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import useTheme from "@material-ui/core/styles/useTheme";

import { Card, CardContent, CardActions, Typography } from "@material-ui/core";
import { Button, CardActionArea, Link } from "gatsby-theme-material-ui";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    marginBottom: theme.spacing(3),
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  toolbarLink: {
    color:
      theme.palette.type === "dark"
        ? theme.palette.secondary.main
        : theme.palette.primary.main,
  },
}));

const BlogPost = ({ date, author, title, excerpt, slug, id }) => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <Link
      to={`/blog/${slug}`}
      className={classes.toolbarLink}
      component={CardActionArea}
    >
      <Card elevation={3} className={classes.root} key={id}>
        <CardContent>
          <Typography
            className={classes.title}
            color={theme.palette.type === "dark" ? "secondary" : "primary"}
            gutterBottom
          >
            {date} by {author}
          </Typography>
          <Typography variant="h5" component="h2">
            {title}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {excerpt}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            to={`/blog/${slug}`}
            color={theme.palette.type === "dark" ? "secondary" : "primary"}
          >
            Read more...
          </Button>
        </CardActions>
      </Card>
    </Link>
  );
};

export default BlogPost;
