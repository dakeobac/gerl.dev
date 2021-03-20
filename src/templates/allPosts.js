import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import { graphql } from "gatsby";
import { Box, Typography, Divider } from "@material-ui/core";
import { Link } from "gatsby-theme-material-ui";
import BlogPost from "../components/BlogPost";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

const useStyles = makeStyles((theme) => ({
  link: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}));

const AllPosts = ({ data, pageContext }) => {
  const classes = useStyles();
  const theme = useTheme();

  const { currentPage, numPages } = pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage = currentPage - 1 === 1 ? "/blog" : `${currentPage - 1}`;
  const nextPage = `/blog/${currentPage + 1}`;

  const posts = data.allMdx.edges;
  // console.log("numPages", numPages, "currentPage", currentPage, "isFirst", isFirst, "isLast", isLast, "prevPage", prevPage, "nextPage", nextPage)
  return (
    <>
      <Box>
        {posts.map(({ node }, index) => (
          <BlogPost
            date={node.frontmatter.date}
            author={node.frontmatter.author}
            title={node.frontmatter.title}
            excerpt={node.excerpt}
            slug={node.frontmatter.slug}
            id={node.id}
            currentPage={currentPage}
            key={index}
          />
        ))}
      </Box>
      <Divider />
      <Box
        marginTop="1rem"
        display="flex"
        justifyContent="space-around"
        alignItems="center"
      >
        {!isFirst && (
          <Link
            to={prevPage}

            rel="prev"
            className={classes.link}
            color={theme.palette.type === "dark" ? "secondary" : "primary"}
          >
            <Box display="flex" alignItems="center">
              <NavigateBeforeIcon
                color={theme.palette.type === "dark" ? "secondary" : "primary"}
              />
              <Typography
                variant="subtitle2"
                component="p"
                color="textSecondary"
              >
                Go to previous page
              </Typography>
            </Box>
          </Link>
        )}
        {!isLast && (
          <Link
            to={nextPage}
            className={classes.link}
            color={theme.palette.type === "dark" ? "secondary" : "primary"}
          >
            <Box display="flex" alignItems="center">
              <Typography
                variant="subtitle2"
                component="p"
                color="textSecondary"
                align="right"
              >
                Go to next page
              </Typography>
              <NavigateNextIcon
                color={theme.palette.type === "dark" ? "secondary" : "primary"}
              />
            </Box>
          </Link>
        )}
      </Box>
    </>
  );
};

export default AllPosts;

export const PageQuery = graphql`
  query AllBlogPosts($skip: Int!, $limit: Int!) {
    allMdx(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { fileAbsolutePath: { regex: "/posts/" } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          frontmatter {
            date(fromNow: true)
            title
            slug
            author
          }
          id
          excerpt(truncate: true)
        }
      }
    }
  }
`;
