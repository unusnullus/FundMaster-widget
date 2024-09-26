import { FunctionalComponent } from "preact";
import { useEffect, useState } from "preact/hooks";

import CopyIcon from "../../assets/copy.svg";
import CloseIcon from "../../assets/close.svg";

import styles from "./styles.css";
import Button from "../button";

interface ConnectWalletProps {
  onNext: () => void;
  onBack: () => void;
  onClose: () => void;
}

const CryptoPay: FunctionalComponent<ConnectWalletProps> = ({ onClose, onNext, onBack }) => {
  const [timeLeft, setTimeLeft] = useState(5 * 60);
  const [isTimeOut, setIsTimeOut] = useState(false);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          setIsTimeOut(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onClose]);

  return (
    <div className="container">
      <style>{styles.toString()}</style>

      {!isTimeOut && (
        <>
          <div className="connect-wallet-title">
            <p className="crypto-title">Pay for your order</p>
            <div className="timer">{formatTime(timeLeft)}</div>
          </div>
          <div className="network-container">
            <span className="input-title">Network</span>
            <span>TRC20</span>
          </div>
          <Button variant="primary" onClick={onNext}>
            Pay
          </Button>
          <div className="pay-field">
            <span className="input-title">Amount to pay</span>
            <div className="pay-data-container">
              <span>23.04 USDT</span>
              <CopyIcon className="pointer" />
            </div>
          </div>
          <div className="pay-field">
            <span className="input-title">Pay to this address</span>
            <div className="pay-data-container">
              <span>MWTk543dlsnsk6489wrksakjdhwjhdkjaskjd4</span>
              <CopyIcon className="pointer" />
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

export default CryptoPay;
