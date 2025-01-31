import { FunctionalComponent } from "preact";
import { memo, useRef } from "preact/compat";
import { PaymentOption, PaymentRequest } from "../../types/merchant";

interface ConnectWalletProps {
  onNext: () => void;
  onBack: () => void;
  onClose: () => void;
  onReset: () => void;
  onError: () => void;
  paymentRequest?: PaymentRequest;
  selectedCrypto: PaymentOption | null;
}

const NovaBanka: FunctionalComponent<ConnectWalletProps> = ({
  onClose,
  onBack,
  onNext,
  paymentRequest,
  selectedCrypto,
}) => {
  const ref = useRef<null | HTMLIFrameElement>(null);

  return (
    <div className="step-container" style={{ padding: 0 }}>
      <iframe
        ref={ref}
        onLoad={() => {
          try {
            ref.current?.contentWindow?.document && onNext();
          } catch (e) {
            console.log("Cross domain navigation");
          }
        }}
        style={{ width: "100%", height: "850px" }}
        src={paymentRequest?.externalPaymentUrl}
      ></iframe>
    </div>
  );
};

export default memo(NovaBanka);
