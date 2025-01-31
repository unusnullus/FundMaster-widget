import { FunctionalComponent } from "preact";
import { useMemo, useState } from "preact/hooks";
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
  description,
  amount,
  currencyName,
  isLoading,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState(false);

  const formattedAmount = useMemo(
    () => (amount ? `${formatNumber(amount, 6)} ${currencyName}` : ""),
    [amount, currencyName]
  );

  const handleCheckboxChange = () => {
    setIsChecked((prev) => !prev);
    setError(false);
  };

  const handleContinue = () => {
    if (isLoading || !currencyName) return;

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
        {(isLoading || !currencyName) && (
          <div className="loader-container">
            <div className="loader" />
          </div>
        )}
        {!isLoading && currencyName && (
          <>
            <div className="items-list">
              <div className="item-container">
                <div className="title-container">
                  <span className="title">{title}</span>
                  {description && (
                    <span className="description">{description}</span>
                  )}
                </div>
                {formattedAmount && <span>{formattedAmount}</span>}
              </div>
            </div>
            <div className="total-container">
              {formattedAmount ? (
                <>
                  <span>Total</span>
                  <span>{formattedAmount}</span>
                </>
              ) : (
                <span>You are making a voluntary payment.</span>
              )}
            </div>
          </>
        )}
      </div>
      <div
        className="terms-of-use-container pointer"
        onClick={handleCheckboxChange}
      >
        <input
          type="checkbox"
          className={`checkbox ${error ? "error" : ""} `}
          checked={isChecked}
        />
        <p>
          I confirm that I have read <span>Terms of Use</span>
        </p>
      </div>
      <div className="footer-button-container">
        <Button variant="secondary" onClick={onClose}>
          Back
        </Button>
        <Button
          disabled={!isChecked || isLoading || !currencyName}
          variant="primary"
          onClick={handleContinue}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default OrderSummary;
