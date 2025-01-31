import { render } from "preact";
import { StyleSheetManager } from "styled-components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PaymentWidget from "./payment-widget";
import { EmbedProps, RootProps } from "./types/types";
import { AppContainer, GlobalStyle } from "./styles";
import { MerchantPaymentRequest } from "types/merchant";

const queryClient = new QueryClient();

const PaymentWidgetRoot = ({
  shadowRoot,
  fontFamily,
  onClose,
  ...paymentData
}: EmbedProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <StyleSheetManager target={shadowRoot as unknown as HTMLElement}>
        <AppContainer fontFamily={fontFamily}>
          <PaymentWidget onClose={onClose} {...paymentData} />
        </AppContainer>
      </StyleSheetManager>
    </QueryClientProvider>
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

  const openWidget = (data: MerchantPaymentRequest) => {
    if (!appRoot.shadowRoot) {
      appRoot.attachShadow({
        mode: "open",
      });
    }

    if (appRoot.shadowRoot) {
      const existingStyles = appRoot.shadowRoot.querySelectorAll("style");
      existingStyles.forEach((style) => style.remove());

      render(
        <PaymentWidgetRoot
          shadowRoot={appRoot.shadowRoot}
          fontFamily={fontFamily}
          onClose={closeWidget}
          {...data}
        />,
        appRoot.shadowRoot
      );
    }
  };

  window.addEventListener("open-widget", (event: Event) => {
    const data = (event as CustomEvent).detail as MerchantPaymentRequest;

    openWidget(data);
  });
};
