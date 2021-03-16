import React from "react";
import { Paper, Box, Container } from "@material-ui/core";
import ParticlesEffect from "./Particles";
import Header from "./Header";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <Paper square>
      <Container
        maxWidth="sm"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <Header />
        <Box flexGrow="1">
          <main>{children}</main>
        </Box>
        <Footer />
        <ParticlesEffect />
      </Container>
    </Paper>
  );
}

export default Layout;
