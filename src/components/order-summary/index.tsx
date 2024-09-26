import { FunctionalComponent } from "preact";
import { useState } from "preact/hooks";
import { JSXInternal } from "preact/src/jsx";
import TargetedEvent = JSXInternal.TargetedEvent;

import Button from "../button";

import styles from "./styles.css";

interface SelectPaymentProps {
  onNext: () => void;
  onClose: () => void;
}

const OrderSummary: FunctionalComponent<SelectPaymentProps> = ({ onNext, onClose }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState(false);

  const handleCheckboxChange = (event: TargetedEvent<HTMLInputElement>) => {
    setIsChecked(event.currentTarget.checked);
    setError(false);
  };

  const handleContinue = () => {
    if (!isChecked) {
      setError(true);
      return;
    }
    onNext();
  };

  return (
    <div className="step-container">
      <style>{styles.toString()}</style>
      <p className="step-title">Order summary</p>
      <div className="items-list">
        <div className="item-container">
          <span>Item to buy</span>
          <span>€13.99</span>
        </div>
        <div className="item-container">
          <span>Item to buy</span>
          <span>€8.99</span>
        </div>
      </div>
      <div className="total-container">
        <span>Total</span>
        <span>€22.98</span>
      </div>
      <div className="terms-of-use-container">
        <input
          type="checkbox"
          className={`checkbox ${error ? "error" : ""} `}
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <p>
          I confirm that I have read <span>Terms of Use</span>
        </p>
      </div>
      <div className="footer-button-container">
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleContinue}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default OrderSummary;
