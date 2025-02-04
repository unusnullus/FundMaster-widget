import { FunctionalComponent } from "preact";
import Button from "../button";
import styles from "./styles.css";

interface PaymentStatusProps {
  onClose: () => void;
  setActiveStep: (step: number) => void;
}

const PaymentStatusWaiting: FunctionalComponent<PaymentStatusProps> = ({
  onClose,
  setActiveStep,
}) => {
  //todo
  return (
    <div className="step-container">
      <style>{styles.toString()}</style>
      <div className="loader-container">
        <div className="loader" />
        <span className="status">
          Please wait <br />
          Your payment is being processed
        </span>
      </div>

      {/* todo */}
      {/* <Button variant="secondary" onClick={onClose}>
          Close
        </Button> */}
      {/* <button onClick={onClose}>Close //todo timeout</button> */}
    </div>
  );
};

export default PaymentStatusWaiting;
