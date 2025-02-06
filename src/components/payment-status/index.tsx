import styles from "./styles.css";
import SuccessIcon from "../../assets/success.svg";
import CancelledIcon from "../../assets/cancelled.svg";
import { useEffect, useState } from "preact/hooks";
import { FunctionalComponent } from "preact";
import Button from "../button";
import { STATUSES } from "../../constants/enums";
import { ReactNode } from "preact/compat";

interface PaymentStatusProps {
  onClose: () => void;
  status?: STATUSES;
}

const STATUS_TEXT: Partial<Record<STATUSES, string>> = {
  [STATUSES.Canceled]: "Your payment is canceled",
  [STATUSES.Paid]: "Your payment is successful",
};

const STATUS_ICON: Partial<Record<STATUSES, ReactNode>> = {
  [STATUSES.Paid]: <SuccessIcon />,
  [STATUSES.Canceled]: <CancelledIcon />,
};

const PaymentStatus: FunctionalComponent<PaymentStatusProps> = ({
  onClose,
  status,
}) => {
  return (
    <div className="step-container">
      <style>{styles.toString()}</style>
      {status && (
        <div className="status-container">
          {STATUS_ICON[status]}
          <span className="status">{STATUS_TEXT[status]}</span>
        </div>
      )}
      <Button variant="secondary" onClick={onClose}>
        Back to merchant
      </Button>
    </div>
  );
};

export default PaymentStatus;
