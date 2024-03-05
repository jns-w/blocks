import {createGlobalStyle} from "styled-components";

const GlobalStyle = createGlobalStyle`
  
  @font-face {
    font-family: 'SFProDisplay';
    src: url('/fonts/sfpro/SFProDisplay-Light.woff2') format('woff2');
    font-weight: 300;
    font-style: normal;
    font-display: optional;
  }

  @font-face {
    font-family: 'SFProDisplay';
    src: url('/fonts/sfpro/SFProDisplay-Black.woff2') format('woff2');
    font-weight: 900;
    font-style: normal;
    font-display: optional;
  }

  @font-face {
    font-family: 'SFProDisplay';
    src: url('/fonts/sfpro/SFProDisplay-Heavy.woff2') format('woff2');
    font-weight: 1000;
    font-style: normal;
    font-display: optional;
  }

  @font-face {
    font-family: 'SFProDisplay';
    src: url('/fonts/sfpro/SFProDisplay-Bold.woff2') format('woff2');
    font-weight: bold;
    font-style: normal;
    font-display: optional;
  }

  @font-face {
    font-family: 'SFProDisplay';
    src: url('/fonts/sfpro/SFProDisplay-LightItalic.woff2') format('woff2');
    font-weight: 300;
    font-style: italic;
    font-display: optional;
  }

  @font-face {
    font-family: 'SFProDisplay';
    src: url('/fonts/sfpro/SFProDisplay-Medium.woff2') format('woff2');
    font-weight: 500;
    font-style: normal;
    font-display: optional;
  }

  @font-face {
    font-family: 'SFProDisplay';
    src: url('/fonts/sfpro/SFProDisplay-MediumItalic.woff2') format('woff2');
    font-weight: 500;
    font-style: italic;
    font-display: optional;
  }

  @font-face {
    font-family: 'SFProDisplay';
    src: url('/fonts/sfpro/SFProDisplay-RegularItalic.woff2') format('woff2');
    font-weight: normal;
    font-style: italic;
    font-display: optional;
  }

  @font-face {
    font-family: 'SFProDisplay';
    src: url('/fonts/sfpro/SFProDisplay-Semibold.woff2') format('woff2');
    font-weight: 600;
    font-style: normal;
    font-display: optional;
  }

  @font-face {
    font-family: 'SFProDisplay';
    src: url('/fonts/sfpro/SFProDisplay-Regular.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
    font-display: optional;
  }

  @font-face {
    font-family: 'SFProDisplay';
    src: url('/fonts/sfpro/SFProDisplay-Ultralight.woff2') format('woff2');
    font-weight: 100;
    font-style: normal;
    font-display: optional;
  }

  @font-face {
    font-family: 'SFProDisplay';
    src: url('/fonts/sfpro/SFProDisplay-UltralightItalic.woff2') format('woff2');
    font-weight: 100;
    font-style: italic;
    font-display: optional;
  }

  @font-face {
    font-family: 'SFProDisplay';
    src: url('/fonts/sfpro/SFProDisplay-Thin.woff2') format('woff2');
    font-weight: 100;
    font-style: normal;
    font-display: optional;
  }


  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  //h1 {
  //  font-family: SFProDisplay, sans-serif;
  //  font-weight: 900;
  //},
  //h2,
  //h3,
  //h4,
  //h5,
  //h6,
  //p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    box-sizing: border-box;
  }

  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }

  ol,
  ul {
    list-style: none;
  }

  blockquote,
  q {
    quotes: none;
  }

  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: "";
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  a {
    color: #3913b8;
    font-weight: 600;
    text-decoration: none;
  }

  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  }

  
  input {
    all: unset;
  }
  
`;

export default GlobalStyle;
