import { render } from "preact";
import { StyleSheetManager } from "styled-components";
import PaymentWidget from "./payment-widget";
import { EmbedProps, RootProps } from "./types";
import { AppContainer, GlobalStyle } from "./styles";

const PaymentWidgetRoot = ({ shadowRoot, fontFamily, onClose }: EmbedProps) => {
  return (
    <>
      <GlobalStyle />
      <StyleSheetManager target={shadowRoot as unknown as HTMLElement}>
        <AppContainer fontFamily={fontFamily}>
          <PaymentWidget onClose={onClose} />
        </AppContainer>
      </StyleSheetManager>
    </>
  );
};

export const init = ({ rootId, fontFamily }: RootProps) => {
  const appRoot = document.querySelector(`#${rootId}`);
  if (!appRoot) {
    console.error("App root could not be found. Check your rootId");
    return null;
  }

  const closeWidget = () => {
    if (appRoot.shadowRoot) {
      render(null, appRoot.shadowRoot);
    }
  };

  const openWidget = () => {
    if (!appRoot.shadowRoot) {
      appRoot.attachShadow({
        mode: "open",
      });
    }

    if (appRoot.shadowRoot) {
      const existingStyles = appRoot.shadowRoot.querySelectorAll("style");
      existingStyles.forEach((style) => style.remove());

      render(
        <PaymentWidgetRoot shadowRoot={appRoot.shadowRoot} fontFamily={fontFamily} onClose={closeWidget} />,
        appRoot.shadowRoot
      );
    }
  };

  window.addEventListener("open-widget", () => {
    openWidget();
  });
};
