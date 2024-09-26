import type { FunctionalComponent } from "preact";
import Button from "../button";
import VisaIcon from "../../assets/visa.svg";
import MasterIcon from "../../assets/master.svg";
import UnionPayIcon from "../../assets/union-pay.svg";
import AmexIcon from "../../assets/amex.svg";
import GoogleIcon from "../../assets/google.svg";
import AppleIcon from "../../assets/apple.svg";
import BitcoinIcon from "../../assets/bitcoin.svg";
import EthereumIcon from "../../assets/ethereum.svg";
import styles from "./styles.css";
import { PaymentMethods } from "../../enums";

interface SelectPaymentProps {
  onClose: () => void;
  onClick: (value: PaymentMethods) => () => void;
}

const SelectPayment: FunctionalComponent<SelectPaymentProps> = ({ onClose, onClick }) => {
  return (
    <div className="select-payment-container">
      <style>{styles.toString()}</style>
      <p className="select-payment-title">Select payment method</p>
      <div className="cards-container">
        <div className="card" onClick={onClick(PaymentMethods.Card)}>
          <div className="logo-container">
            <VisaIcon />
            <MasterIcon />
            <UnionPayIcon />
            <AmexIcon />
            <GoogleIcon />
            <AppleIcon />
          </div>
          <div>Credit or debit card</div>
        </div>
        <div className="card" onClick={onClick(PaymentMethods.Crypto)}>
          <div className="logo-container">
            <BitcoinIcon />
            <EthereumIcon />
          </div>
          <div>Cryptocurrencies</div>
        </div>
      </div>
      <Button variant="secondary" onClick={onClose}>
        Cancel
      </Button>
    </div>
  );
};

export default SelectPayment;
