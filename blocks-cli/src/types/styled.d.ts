// #region Global Imports
import "styled-components";
// #endregion Global Imports


type CommonColors =
  | "transparent"
  | "darkGrey"
  | "blackGrey"
  | "white"
  | "black";

type ExtendedColors =
  | CommonColors
  | "toggleBorder"
  | "gradient"
  | "background"
  | "headerBg"
  | "cardsBg"
  | "cardsHover"
  | "inputBg"
  | "inputOutline"
  | "textColor"
  | "warning"
  | "mildTextColor"
  | "mainAccent"
  | "inactiveAccent"
  | "boxOutline"
  | "boxShadow";

type FontSizes =
  | "xxs"
  | "xs"
  | "ss"
  | "s"
  | "m"
  | "l"
  | "ll"
  | "xl"
  | "xxl";

type Spaces =
  | "smaller"
  | "small"
  | "medium"
  | "large"
  | "larger"
  | "extraLarge";



declare module "styled-components" {
  export interface BaseTheme {
    color: Record<CommonColors, string>;
    fontSize: Record<FontSizes, string>
    space: Record<Spaces, string>;
  }
  export interface DefaultTheme extends BaseTheme {
    name: 'light' | 'dark';
    color: Record<ExtendedColors, string>;
  }
}
