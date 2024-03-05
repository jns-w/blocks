// #region Global Imports
import { BaseTheme } from "styled-components";
// #endregion Global Imports


const fontSize = {
  xxs: "6px",
  xs: "8px",
  ss: "10px",
  s: "14px",
  m: "16px",
  l: "24px",
  ll: "36px",
  xl: "48px",
  xxl: "96px"
}

const space = {
  smaller: "4px",
  small: "8px",
  medium: "16px",
  large: "32px",
  larger: "48px",
  extraLarge: "56px"
}

const base: BaseTheme = {
  color: {
    transparent: "transparent",
    darkGrey: "#282C34",
    blackGrey: "#20232A",
    white: "#FFFFFF",
    black: "#000000"
  },
  fontSize,
  space,
};

export { base };
