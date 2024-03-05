// #region Global Imports
import {DefaultTheme} from "styled-components";
// #endregion Global Imports
import {base} from "./base";

const dark: DefaultTheme = {
  name: "dark",
  ...base,
  color: {
    ...base.color,
    toggleBorder: "#556678",
    gradient: "linear-gradient(#091236, #1E215D)",
    background: "#1b2025",
    headerBg: "#1A1C22",
    cardsBg: "#101215",
    cardsHover: "#272731",
    inputBg: "#1b1e24",
    inputOutline: "#3b3b3b",
    textColor: "#f6f6f6",
    mildTextColor: "#a6a4a4",
    mainAccent: "#630efd",
    warning: "#ee4554",
    inactiveAccent: "#4f4f4f",
    boxOutline: "#272a37",
    boxShadow: "#2a2a2a",
  },
};

export {dark};
