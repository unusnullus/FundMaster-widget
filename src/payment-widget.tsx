import { useEffect, useState } from "preact/hooks";
import Stepper from "./components/stepper";
import styles from "./styles.css";
import { PaymentMethods, STATUSES } from "./constants/enums";
import { PAYMENT_METHOD_STEPS } from "./constants/constants";
import OrderSummary from "./components/order-summary";
import PaymentStatus from "./components/payment-status";
import ConnectWallet from "./components/connect-wallet";
import CryptoPay from "./components/crypto-pay";
import { usePaymentRequest } from "./services/merchant/use-payment-request";
import { useCancelPaymentRequest } from "./services/merchant/use-cancel-payment-request";
import { usePaymentDetails } from "./services/customer/use-payment-details";

interface PaymentDialogProps {
  onClose: () => void;
  title?: string;
  description?: string;
}

const PaymentWidget = ({ onClose, title = "Item 1", description = "Test description" }: PaymentDialogProps) => {
  const abortController = new AbortController();

  const [activeStep, setActiveStep] = useState(2);
  const [method, setMethod] = useState<PaymentMethods | null>(PaymentMethods.Crypto);

  const {
    data: paymentRequest,
    mutate: createPaymentRequest,
    reset,
  } = usePaymentRequest(
    {
      uid: "test12",
      operationId: "test",
      title,
      description,
      baseAmount: "10",
      baseCurrencyName: "USD",
    },
    abortController.signal
  );

  const token = paymentRequest?.data.customerToken ?? "";
  const requestId = paymentRequest?.data.paymentRequest.id;

  const { data: details, isLoading: isDetailsLoading } = usePaymentDetails(token, activeStep);
  const status = details?.data.status;
  const { mutate } = useCancelPaymentRequest();

  const handleClose = () => {
    if (requestId) {
      mutate(requestId);
    } else {
      abortController.abort();
    }

    onClose();
  };

  const handleNextStep = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBackToFirstStep = () => {
    setActiveStep(2);
    setMethod(PaymentMethods.Crypto);
    mutate(requestId);
    createPaymentRequest();
  };

  useEffect(() => {
    if (status === STATUSES.Paid) {
      setActiveStep(5);
    }
  }, [status]);

  useEffect(() => {
    createPaymentRequest();

    return () => {
      abortController.abort();

      if (requestId) {
        mutate(requestId);
      }
    };
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (requestId) {
        mutate(requestId);
      }
      event.preventDefault();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [requestId]);

  useEffect(() => {
    setActiveStep(2);
  }, []);

  const handleBackStep = () => {
    if (activeStep === 2) {
      handleClose();
      return;
    }

    setActiveStep((prev) => prev - 1);
  };

  const renderCryptoSteps = (step: number) => {
    switch (step) {
      case 2:
        return <ConnectWallet onClose={handleBackStep} onNext={handleNextStep} token={token} />;
      case 3:
        return (
          <OrderSummary
            onClose={handleBackStep}
            onNext={handleNextStep}
            title={details?.data.title}
            description={details?.data.description}
            currencyName={details?.data.currencyName}
            amount={details?.data.amount}
            isLoading={isDetailsLoading}
          />
        );
      case 4:
        return (
          <CryptoPay
            onClose={handleClose}
            onNext={handleNextStep}
            onBack={handleBackToFirstStep}
            onReset={reset}
            address={details?.data.address}
            currencyName={details?.data.currencyName}
            amount={details?.data.amount}
            date={details?.data.expirationDate}
            requestId={requestId}
          />
        );
      case 5:
        return <PaymentStatus onClose={handleClose} />;
    }
  };

  return (
    <div className="widget-container">
      <style>{styles.toString()}</style>
      {method && activeStep <= PAYMENT_METHOD_STEPS[method].length && (
        <Stepper steps={PAYMENT_METHOD_STEPS[method]} activeStep={activeStep} />
      )}
      {method === PaymentMethods.Crypto && renderCryptoSteps(activeStep)}
    </div>
  );
};

export default PaymentWidget;
