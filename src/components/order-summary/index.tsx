import { FunctionalComponent } from "preact";
import { useState } from "preact/hooks";
import { JSXInternal } from "preact/src/jsx";
import TargetedEvent = JSXInternal.TargetedEvent;

import Button from "../button";

import styles from "./styles.css";
import { formatNumber } from "../../lib/format-number";

interface SelectPaymentProps {
  onNext: () => void;
  onClose: () => void;
  isLoading: boolean;
  title?: string;
  description?: string;
  amount?: string;
  currencyName?: string;
}

const OrderSummary: FunctionalComponent<SelectPaymentProps> = ({
  onNext,
  onClose,
  title,
  amount,
  currencyName,
  isLoading,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState(false);

  const handleCheckboxChange = (event: TargetedEvent<HTMLInputElement>) => {
    setIsChecked(event.currentTarget.checked);
    setError(false);
  };

  const handleContinue = () => {
    if (isLoading || !amount) return;

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
      <div className="details-container">
        {(isLoading || !amount) && <div className="loader" />}
        {!isLoading && amount && (
          <>
            <div className="items-list">
              <div className="item-container">
                <span>{title}</span>
                <span>
                  {formatNumber(amount, 6)} {currencyName}
                </span>
              </div>
            </div>
            <div className="total-container">
              <span>Total</span>
              <span>
                {formatNumber(amount, 6)} {currencyName}
              </span>
            </div>
          </>
        )}
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
