const path = require("path");

exports.createPages = async ({ graphql, actions, reporter }) => {
  // destructure the createPage function from the actions object
  const { createPage } = actions;

  const result = await graphql(`
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
              slug
              author
            }
            id
            excerpt(truncate: true)
          }
          next {
            frontmatter {
              title
            }
          }
          previous {
            frontmatter {
              title
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
  }

  const posts = result.data.allMdx.edges;
  // call `createPage` for each result
  posts.forEach(({ node }, i) => {
    createPage({
      path: `/blog/${node.frontmatter.slug}`,
      component: path.resolve(`./src/templates/blogPostTemplate.js`),
      // you can use the values in this context in
      // our page layout component
      context: {
        id: node.id,
        prev: i === 0 ? null : posts[i - 1].node,
        next: i === posts.length - 1 ? null : posts[i + 1].node,
      },
    });
  });
  // create blog post pages
  const postsPerPage = 3;
  const numPages = Math.ceil(result.data.allMdx.edges.length / postsPerPage);

  Array.from({ length: numPages }).forEach((_, i) => {
    actions.createPage({
      path: i === 0 ? `/blog` : `/blog/${i + 1}/`,
      component: require.resolve("./src/templates/allPosts.js"),
      context: {
        prev: i === 0 ? null : posts[i - 1].node,
        next: i === posts.length - 1 ? null : posts[i + 1].node,
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    });
  });

};
