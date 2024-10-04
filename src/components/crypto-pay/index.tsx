import { FunctionalComponent } from "preact";
import { useMemo, useState } from "preact/hooks";
import { memo } from "preact/compat";
import QRcode from "react-qr-code";

import CopyIcon from "../../assets/copy.svg";
import CloseIcon from "../../assets/close.svg";

import styles from "./styles.css";
import Button from "../button";
import { formatNumber } from "../../lib/format-number";
import { useCountdown } from "../../hooks/use-count-down";
import { useCancelPaymentRequest } from "../../services/merchant/use-cancel-payment-request";
import { useClipboard } from "../../hooks/use-clipboard";
import { PaymentOption } from "../../types/merchant";

interface ConnectWalletProps {
  onNext: () => void;
  onBack: () => void;
  onClose: () => void;
  onReset: () => void;
  onError: () => void;
  address?: string;
  amount?: string;
  currencyName?: string;
  date?: string;
  requestId?: number;
  selectedCrypto: PaymentOption | null;
}

const CryptoPay: FunctionalComponent<ConnectWalletProps> = ({
  onClose,
  onBack,
  onReset,
  onError,
  address,
  amount,
  currencyName,
  date,
  requestId,
  selectedCrypto,
}) => {
  const [isTimeOut, setIsTimeOut] = useState(false);
  const { mutate } = useCancelPaymentRequest(onError);
  const { copyToClipboard } = useClipboard();

  const handleCopy =
    (text = "") =>
    () => {
      copyToClipboard(text);
    };

  const handleExpire = () => {
    setIsTimeOut(true);
    mutate(requestId);
    onReset();
  };

  const timeLeft = useCountdown(handleExpire, date);

  const formattedTime = useMemo(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }, [timeLeft]);

  const formattedAmount = useMemo(
    () => (amount ? `${formatNumber(amount, 6)} ${currencyName}` : ""),
    [amount, currencyName]
  );

  return (
    <div className="step-container">
      <style>{styles.toString()}</style>
      {!isTimeOut && (
        <>
          <div className="connect-wallet-title">
            <p className="step-title">Pay for your order</p>
            <div className="timer">{formattedTime}</div>
          </div>
          {selectedCrypto && (
            <div className="network-container">
              <span className="input-title">Network</span>
              <span>{selectedCrypto.currencyTitle}</span>
            </div>
          )}
          <div className="qr-code-container">{address && <QRcode value={address} size={140} />}</div>
          {formattedAmount && (
            <div className="pay-field">
              <span className="input-title">Amount to pay</span>
              <div className="pay-data-container">
                <span>{formattedAmount}</span>
                <CopyIcon className="pointer" onClick={handleCopy(formattedAmount)} />
              </div>
            </div>
          )}
          <div className="pay-field">
            <span className="input-title">Pay to this address</span>
            <div className="pay-data-container">
              <span>{address}</span>
              <CopyIcon className="pointer" onClick={handleCopy(address)} />
            </div>
          </div>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </>
      )}
      {isTimeOut && (
        <>
          <div className="title fail">
            Transaction is failed <CloseIcon width="24" height="24" />
          </div>
          <Button variant="secondary" onClick={onBack}>
            Back
          </Button>
        </>
      )}
    </div>
  );
};

export default memo(CryptoPay);
