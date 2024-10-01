import styled, { createGlobalStyle } from "styled-components";
import { AppContainerProps } from "./types/types";

export const GlobalStyle = createGlobalStyle`
  :root {
    --widget-background-color: #ffffff;
    --widget-text-color: #000000;
    --widget-blue: #277cfb;
    --widget-dark-blue: #1b56af;
    --widget-light-blue: #f2f7ff;
    --widget-red: #f94a4a;
    --widget-light-red: #ffe8e7;
    --widget-stroke: #dce4f1;
    --widget-grey: #8c95a5;
    --widget-grey-light: #f9fafb;
    --widget-button-text-color: #ffffff;
  }

  [data-theme="dark"] {
    --widget-background-color: #202224;
    --widget-text-color: #ffffff;
    --widget-blue: #277cfb;
    --widget-dark-blue: #1b56af;
    --widget-light-blue: #f2f7ff;
    --widget-red: #f94a4a;
    --widget-light-red: #4a2f2d;
    --widget-stroke: #33373e;
    --widget-grey: #5f6875;
    --widget-grey-light: #282c30;
    --widget-button-text-color: #ffffff;
  }
`;

export const AppContainer = styled.div<AppContainerProps>`
  position: absolute;
  left: 0;
  top: 0;
  font-family: ${(p) => p.fontFamily || "sans-serif"};
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  & {
    * {
      box-sizing: border-box;
    }
  }
`;
