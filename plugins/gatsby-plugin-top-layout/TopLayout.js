import React from "react";
import { Helmet } from "react-helmet";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import initialTheme from "../../src/theme/theme";
import { themeReducer, initialState } from "../../src/reducers/themeReducer";
import { DispatchContext } from "../../src/context/DispatchContext";
import Layout from "../../src/components/Layout";
import ParticlesEffect from "../../src/components/Particles";



export default function TopLayout(props) {
  //const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [state, dispatch] = React.useReducer(themeReducer, initialState);
  const {darkMode} = state

  const theme = React.useMemo(() => {
    return createMuiTheme({
      ...initialTheme,
      palette: {
        primary: initialTheme.palette.primary,
        secondary: initialTheme.palette.secondary,
        type: darkMode ? "dark" : "light",
      },
      overrides: {
        MuiCssBaseline: {
          "@global": {
            "*::-webkit-scrollbar": {
              width: "0.4em",
            },
            "*::-webkit-scrollbar-track": {
              "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
            },
            "*::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0,0,0,.1)",
              outline: "1px solid slategrey",
            },
          },
        },
      },
    });
  }, [darkMode]);

  return (
    <React.Fragment>
      <Helmet>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
          lang="en"
          />
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap"
          rel="stylesheet"
          />
      </Helmet>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <DispatchContext.Provider value={dispatch}>
          <Layout>

          {props.children}
          </Layout>
        </DispatchContext.Provider>
        <ParticlesEffect />
      </ThemeProvider>
    </React.Fragment>
  );
}
