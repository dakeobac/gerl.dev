import React from "react";
import { Link } from 'gatsby-theme-material-ui'
import Typography from "@material-ui/core/Typography"
import { graphql, useStaticQuery } from "gatsby";

const Copyright = () => {
      const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          author
        }
      }
    }
  `);
  return (
    <>
      <Typography variant="body1">
        Created by {data.site.siteMetadata.author}.
      </Typography>
      <Typography style={{ textAlign: "center" }} variant="body2">
        <Link to="/" color="text">
          {data.site.siteMetadata.title}
        </Link>
        {" © "}
        {new Date().getFullYear()}
        {"🚀🌕🧑‍🚀"}
      </Typography>
    </>
  );
};

export default Copyright;
