import SuccessIcon from "../../assets/success.svg";
import { useEffect, useState } from "preact/hooks";
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
      <div className="loader-container ">
        <div className="loader" />
      </div>
      {/* todo */}
      <button onClick={onClose}>Close //todo timeout</button>
    </div>
  );
};

export default PaymentStatusWaiting;
