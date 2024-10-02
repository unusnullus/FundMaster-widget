import styles from "./styles.css";
import SuccessIcon from "../../assets/success.svg";
import { useEffect, useState } from "preact/hooks";
import { FunctionalComponent } from "preact";
import Button from "../button";

interface PaymentStatusProps {
  onClose: () => void;
}

const PaymentStatus: FunctionalComponent<PaymentStatusProps> = ({ onClose }) => {
  return (
    <div className="step-container">
      <style>{styles.toString()}</style>
      <div className="status-container">
        <SuccessIcon />
        <span className="status">Your payment is successful</span>
      </div>
      <Button variant="secondary" onClick={onClose}>
        Back to merchant
      </Button>
    </div>
  );
};

export default PaymentStatus;
