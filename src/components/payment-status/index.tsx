import styles from "./styles.css";
import SuccessIcon from "../../assets/success.svg";
import { useEffect, useState } from "preact/hooks";
import { FunctionalComponent } from "preact";
import Button from "../button";

interface PaymentStatusProps {
  onClose: () => void;
}

const PaymentStatus: FunctionalComponent<PaymentStatusProps> = ({ onClose }) => {
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPaymentSuccessful(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="payment-status-container">
      <style>{styles.toString()}</style>

      <div className="status-container">
        {isPaymentSuccessful ? (
          <>
            <SuccessIcon />
            <span className="status">Your payment is successful</span>
          </>
        ) : (
          <>
            <div className="progress">
              <div className="loader" />
            </div>
            <span className="status">Processing your payment</span>
          </>
        )}
      </div>
      <Button variant="secondary" onClick={onClose}>
        Back to merchant
      </Button>
    </div>
  );
};

export default PaymentStatus;
