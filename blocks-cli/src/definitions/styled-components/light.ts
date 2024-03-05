// #region Global Imports
import {DefaultTheme} from "styled-components";
// #endregion Global Imports
import {base} from "./base";

const light: DefaultTheme = {
  name: "light",
  ...base,
  color: {
    ...base.color,
    toggleBorder: "#ABB7C4",
    gradient: "linear-gradient(#39598A, #79D7ED)",
    background: "#f8f9fb",
    headerBg: "#20232A",
    cardsBg: "#fefefe",
    cardsHover: "#e9eef3",
    inputBg: "#edeff4",
    inputOutline: "#dbe3e7",
    textColor: "#566072",
    mildTextColor: "#9ca2ad",
    mainAccent: "#e8337d",
    warning: "#d35666",
    inactiveAccent: "#dadfea",
    boxOutline: "#e4e6ea",
    boxShadow: "#eaeaea",
  },
};

export {light};
