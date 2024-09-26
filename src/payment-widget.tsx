import Button from "./components/button";
import SelectPayment from "./components/select-payment";
import { useEffect, useState } from "preact/hooks";
import Stepper from "./components/stepper";
import styles from "./styles.css";
import { PaymentMethods } from "./enums";
import { PAYMENT_METHOD_STEPS } from "./constants";
import CardDetails from "./components/card-details";
import OrderSummary from "./components/order-summary";
import PaymentStatus from "./components/payment-status";
import ConnectWallet from "./components/connect-wallet";
import CryptoPay from "./components/crypto-pay";

interface PaymentDialogProps {
  onClose: () => void;
}

const PaymentWidget = ({ onClose }: PaymentDialogProps) => {
  const [activeStep, setActiveStep] = useState(2);
  const [method, setMethod] = useState<PaymentMethods | null>();

  const handleNextStep = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBackToFirstStep = () => {
    setActiveStep(2);
    setMethod(null);
  };

  useEffect(() => {
    setActiveStep(2);
    setMethod(null);
  }, []);

  const handleBackStep = () => {
    if (activeStep === 2) {
      setMethod(null);
      return;
    }

    setActiveStep((prev) => prev - 1);
  };

  const handleSelectPayment = (value: PaymentMethods) => () => {
    setMethod(value);
  };

  const renderCardSteps = (step: number) => {
    switch (step) {
      case 2:
        return <CardDetails onClose={handleBackStep} onNext={handleNextStep} />;
      case 3:
        return <OrderSummary onClose={handleBackStep} onNext={handleNextStep} />;
      // case 4:
      //   return <SecureForm onNext={handleNextStep} onClose={handleBackStep} />;
      case 4:
        return <PaymentStatus onClose={onClose} />;
    }
  };
  const renderCryptoSteps = (step: number) => {
    switch (step) {
      case 2:
        return <ConnectWallet onClose={handleBackStep} onNext={handleNextStep} />;
      case 3:
        return <OrderSummary onClose={handleBackStep} onNext={handleNextStep} />;
      case 4:
        return <CryptoPay onClose={onClose} onNext={handleNextStep} onBack={handleBackToFirstStep} />;
      case 5:
        return <PaymentStatus onClose={onClose} />;
    }
  };

  return (
    <div className="widget-container">
      <style>{styles.toString()}</style>
      {method && activeStep <= PAYMENT_METHOD_STEPS[method].length && (
        <Stepper steps={PAYMENT_METHOD_STEPS[method]} activeStep={activeStep} />
      )}
      {!method && <SelectPayment onClick={handleSelectPayment} onClose={onClose} />}
      {method === PaymentMethods.Card && renderCardSteps(activeStep)}
      {method === PaymentMethods.Crypto && renderCryptoSteps(activeStep)}
    </div>
  );
};

export default PaymentWidget;
