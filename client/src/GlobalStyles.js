import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  :root {
    --color-dark-salmon: #E29578;
    --color-cornsilk: #FFF3D6;
    --color-alice-blue: #EDF6F9;
    --color-middle-blue-green: #83C5BE;
    --color-ming: #006D77;
    /* --color-buttons: #92593A;
    --color-hover: #BB8B63; */
    --color-buttons: #92593A;
    --color-hover: #BF855F;
    //--font-heading: 'Permanent Marker', Arial, Helvetica, sans-serif;
    --font-side-bar: 'Indie Flower';
    --font-body: 'Garamond';
    --padding-page: 24px;
  }

  /* http://meyerweb.com/eric/tools/css/reset/
      v2.0 | 20110126
      License: none (public domain)
  */

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
      margin: 0;
      padding: 0;
      border: 0;
      box-sizing: border-box;
      font-size: 100%;
      vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
      display: block;
  }
  body {
      line-height: 1;
  }
  ol, ul {
      list-style: none;
  }
  blockquote, q {
      quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
      content: '';
      content: none;
  }

  h1
{
  color: #fff;
  font-family: var(--font-heading);
  font-size: 28px;
  //text-align: center;
}

h2
{
  color: var(--color-alabama-crimson);
  font-family: var(--font-heading);
  font-size: 22px;
  //text-align: center;

}

h3,
label,
button {
  color: #fff;
  font-family: var(--font-heading);
  font-size: 32px;
  text-align: center;
}

input {
  border: 1px solid grey;
  font-family: var(--font-body);
}

  input {
    width: 80px;
    padding: 3px;
    margin: 8px;
    /* font-size: 24px;
    height: 42px;
    border: 2px solid var(--color-orange);
    border-radius: 4px;
    padding: 0 12px; */
  }
`;
