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
  --widget-background-color: #1a1d1f; /* Darker background for better contrast */
  --widget-text-color: #e0e0e0; /* Light gray for better readability */
  --widget-blue: #4a90e2; /* Slightly brighter blue for better visibility */
  --widget-dark-blue: #1b56af; /* Kept the same */
  --widget-light-blue: #1e2a3a; /* Darker blue for dark theme */
  --widget-red: #ff6b6b; /* Brighter red for better visibility */
  --widget-light-red: #4a2f2d; /* Adjusted for dark theme */
  --widget-stroke: #2d3238; /* Slightly lighter stroke for better visibility */
  --widget-grey: #8c95a5; /* Lightened gray for better contrast */
  --widget-grey-light: #232629; /* Darker gray for dark theme */
  --widget-button-text-color: #ffffff; /* Kept the same */
}
`;

export const AppContainer = styled.div<AppContainerProps>`
  position: fixed;
  left: 0;
  top: 0;
  font-family: ${(p) => p.fontFamily || "sans-serif"};
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1400;
  box-sizing: border-box;
  padding: 0 10px;
  background-color: rgba(0, 0, 0, 0.5);
  & {
    * {
      box-sizing: border-box;
    }
  }
`;
