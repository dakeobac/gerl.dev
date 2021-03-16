import React from "react";
import { Paper, Box, Container } from "@material-ui/core";
import Header from "./Header";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <Paper square>
      <Container
        maxWidth="sm"
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Box flexGrow="1">
          <Header />
          <main>{children}</main>
        </Box>
        <Footer />
      </Container>
    </Paper>
  );
}

export default Layout;
