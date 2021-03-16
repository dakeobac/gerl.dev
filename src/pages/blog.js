import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { graphql, useStaticQuery } from "gatsby";
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
}));

const BlogPage = () => {
  const classes = useStyles();

  const data = useStaticQuery(graphql`
    query BlogPosts {
      allMdx(
        sort: { fields: frontmatter___date, order: DESC }
        filter: { fileAbsolutePath: { regex: "/posts/" } }
      ) {
        edges {
          node {
            frontmatter {
              date(fromNow: true)
              title
              path
            }
            id
            excerpt(truncate: true)
          }
        }
      }
    }
  `);
  return (
    <>
      {data.allMdx.edges.map(({ node }, id) => (
        <Card elevation={3} className={classes.root}>
          <Link to={node.frontmatter.path} component={CardActionArea}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                {node.frontmatter.date}
              </Typography>
              <Typography variant="h5" component="h2">
                {node.frontmatter.title}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                {node.excerpt}
              </Typography>
            </CardContent>
          </Link>
          <CardActions>
            <Button size="small" to={node.frontmatter.path}>
              Read more...
            </Button>
          </CardActions>
        </Card>
      ))}
    </>
  );
};

export default BlogPage;
