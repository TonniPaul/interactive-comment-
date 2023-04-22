import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  max-width: 100%;
  color: var(--darkGrey);
  font-family: 'Rubik', sans-serif;
}

:root {
  --grey : #f5f6fa;
  --darkGrey : #6c7176;
  --white : #ffffff;
  --black : #2a3642;
  --blue :#5357b6;
  --borderColor : #c5c6ef;
  --red : #ed6368;
}

body  {
  background: var(--grey);
  font-weight: 400;
  font-size: 1rem;
  color: var(--black);
}
button {
  background: inherit;
  border: none;
  color: inherit;
  font-size: inherit;
  cursor: pointer;
}

textarea {
  resize: none;
  min-height: 110px;
  width: 100%;
  background: inherit;
  border-radius: 5px;
}

`;

export default GlobalStyles;
