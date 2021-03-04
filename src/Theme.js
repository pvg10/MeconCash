import React, { useState, useEffect } from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import rtl from "jss-rtl";
import { create } from "jss";
import { StylesProvider, jssPreset } from "@material-ui/styles";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import App from "./containers/App";
import "react-toastify/dist/ReactToastify.css";
import 'jquery/src/jquery';
import "bootstrap/dist/js/bootstrap.min.js";

function ThemeApp() {
  const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
  const lang = useSelector((state) => state.lang);
  const [direction, setDirection] = useState(lang === "en" ? "ltr" : "rtl");

  useEffect(() => {
    setDirection(lang === "en" ? "ltr" : "rtl");
  }, [lang]);

  const theme = createMuiTheme({
    direction: direction,
    palette: {
      primary: {
        main: "#1976d2",
      },
      secondary: {
        main: "#ac4556",
      },
    },
  });
  return (
    <StylesProvider jss={jss}>
      <ThemeProvider theme={theme}>
        <App />
        <ToastContainer hideProgressBar={true} />
      </ThemeProvider>
    </StylesProvider>
  );
}

export default ThemeApp;
