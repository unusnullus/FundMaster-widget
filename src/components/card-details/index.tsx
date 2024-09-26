import { useRef, useState } from "preact/hooks";
import React, { FunctionalComponent } from "preact";
import { JSXInternal } from "preact/src/jsx";
import TargetedEvent = JSXInternal.TargetedEvent;

import CardIcon from "../../assets/card.svg";
import PhotoIcon from "../../assets/photo.svg";

import styles from "./styles.css";
import Button from "../button";

interface SelectPaymentProps {
  onNext: () => void;
  onClose: () => void;
}

const CardDetails: FunctionalComponent<SelectPaymentProps> = ({ onNext, onClose }) => {
  const [card, setCard] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [expiry, setExpiry] = useState<string>("");
  const [cvc, setCvc] = useState<string>("");
  const [errors, setErrors] = useState<{ card?: string; name?: string; expiry?: string; cvc?: string }>({});
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = () => {
    if (inputRef.current) {
      const cardValue = inputRef.current.value.replace(/\D/g, "").match(/(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})/);

      if (cardValue) {
        inputRef.current.value = [cardValue[1], cardValue[2], cardValue[3], cardValue[4]].filter(Boolean).join(" ");

        const numbers = inputRef.current.value.replace(/(\s)/g, "");
        setCard(numbers);
      }
    }
  };

  const handleExpiryChange = (e: TargetedEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value.replace(/[^\d]/g, "");
    const currentYear = new Date().getFullYear() % 100;

    if (value.length > 4) {
      value = value.slice(0, 4);
    }
    if (value.length > 2) {
      value = `${value.slice(0, 2)} / ${value.slice(2)}`;
    }

    if (value.length >= 2) {
      const month = parseInt(value.slice(0, 2), 10);
      if (month < 1 || month > 12) {
        value = `12${value.slice(2)}`;
      }
    }

    if (value.length === 7) {
      const year = parseInt(value.slice(5), 10);
      if (year < currentYear) {
        value = `${value.slice(0, 5)}${currentYear}`;
      }
    }

    setExpiry(value);
  };

  const handleCvcChange = (e: TargetedEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value.replace(/\D/g, "");
    if (value.length <= 3) {
      setCvc(value);
    }
  };

  const handleSubmit = () => {
    const newErrors: { card?: string; name?: string; expiry?: string; cvc?: string } = {};
    if (!card || card.length !== 16) newErrors.card = "Card number is required";
    if (!name) newErrors.name = "Name is required";
    if (!expiry) newErrors.expiry = "Expiry date is required";
    if (!cvc) newErrors.cvc = "CVC is required";

    setErrors(newErrors);

    if (!Object.keys(newErrors).length) {
      onNext();
    }
  };

  return (
    <div className="step-container">
      <style>{styles.toString()}</style>
      <p className="step-title">Enter your card details</p>
      <div className="card-details-container">
        <div className="card-details">
          <p>Card number</p>
          <div className={`input-container ${errors.card ? "input-error" : ""}`}>
            <input
              placeholder="1234 1234 1234 1234"
              className="input"
              type="text"
              ref={inputRef}
              onChange={handleChange}
            />
            <PhotoIcon viewBox="0 0 30 31" />
          </div>
        </div>
        <div className="card-details">
          <p>Name on card</p>
          <div className={`input-container ${errors.name ? "input-error" : ""}`}>
            <input
              placeholder="Name Surname"
              className="input"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            />
          </div>
        </div>
        <div className="card-details-row">
          <div className="card-details">
            <p>Expiry</p>
            <div className={`input-container ${errors.expiry ? "input-error" : ""}`}>
              <input
                placeholder="12 / 30"
                maxLength={7}
                className="input"
                value={expiry}
                onChange={handleExpiryChange}
              />
            </div>
          </div>
          <div className="card-details">
            <p>CVC</p>
            <div className={`input-container ${errors.cvc ? "input-error" : ""}`}>
              <input
                placeholder="123"
                type="password"
                maxLength={3}
                className="input"
                value={cvc}
                onChange={handleCvcChange}
              />
              <CardIcon viewBox="0 0 31 23" />
            </div>
          </div>
        </div>
      </div>
      <div className="caption">
        By providing your card information, you allow Name Shop to charge your card for future payments in accordance
        with their terms.
      </div>
      <div className="footer-button-container">
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Continue</Button>
      </div>
    </div>
  );
};

export default CardDetails;
