import React from "react";
import { graphql } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";

import { Box, Typography, Divider } from "@material-ui/core";
import { Link } from "gatsby-theme-material-ui";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import useTheme from "@material-ui/core/styles/useTheme";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  link: {
    padding: theme.spacing(1),
    flexShrink: 0,
    color:
      theme.palette.type === "dark"
        ? theme.palette.secondary.main
        : theme.palette.primary.main,
  },
}));

export default function PageTemplate({ data: { mdx }, pageContext }) {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <>
      <Box padding="0 1rem" marginBottom="10rem">
        <Typography variant="h4" component="h2">
          {mdx.frontmatter.title}
        </Typography>
        <Typography
          variant="subtitle1"
          color="textSecondary"
          component="p"
        >{`${mdx.frontmatter.date} by ${mdx.frontmatter.author}`}</Typography>
        <Box marginBottom="1rem">
          <MDXProvider>
            <MDXRenderer>{mdx.body}</MDXRenderer>
          </MDXProvider>
        </Box>
        <Divider />
        <Box
          marginTop="1rem"
          display="flex"
          justifyContent="space-around"
          alignItems="center"
        >
          {pageContext.prev && (
            <Link
              to={`/blog/${pageContext.prev.frontmatter.slug}`}
              className={classes.link}
            >
              <Box display="flex" alignItems="center">
                <NavigateBeforeIcon
                  color={
                    theme.palette.type === "dark" ? "secondary" : "primary"
                  }
                />
                <Typography
                  variant="subtitle2"
                  component="p"
                  color="textSecondary"
                >
                  {pageContext.prev.frontmatter.title}
                </Typography>
              </Box>
            </Link>
          )}
          {pageContext.next && (
            <Link
              to={`/blog/${pageContext.next.frontmatter.slug}`}
              className={classes.link}
            >
              <Box display="flex" alignItems="center">
                <Typography
                  variant="subtitle2"
                  component="p"
                  color="textSecondary"
                  align="right"
                >
                  {pageContext.next.frontmatter.title}
                </Typography>
                <NavigateNextIcon
                  color={
                    theme.palette.type === "dark" ? "secondary" : "primary"
                  }
                />
              </Box>
            </Link>
          )}
        </Box>
      </Box>
    </>
  );
}

export const pageQuery = graphql`
  query BlogPostQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        title
        date(fromNow: true)
        author
      }
    }
  }
`;
