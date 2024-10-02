import { useEffect, useState } from "preact/hooks";
import { PaymentMethods, STATUSES } from "./constants/enums";
import { PAYMENT_METHOD_STEPS } from "./constants/constants";
import Stepper from "./components/stepper";
import OrderSummary from "./components/order-summary";
import PaymentStatus from "./components/payment-status";
import ConnectWallet from "./components/connect-wallet";
import CryptoPay from "./components/crypto-pay";
import Button from "./components/button";
import { usePaymentRequest } from "./services/merchant/use-payment-request";
import { useCancelPaymentRequest } from "./services/merchant/use-cancel-payment-request";
import { usePaymentDetails } from "./services/customer/use-payment-details";
import styles from "./styles.css";
import { PaymentOption } from "types/merchant";

interface PaymentDialogProps {
  onClose: () => void;
  title?: string;
  description?: string;
}

const PaymentWidget = ({ onClose, title = "Item 1", description = "Test description" }: PaymentDialogProps) => {
  const abortController = new AbortController();

  const [activeStep, setActiveStep] = useState(2);
  const [method, setMethod] = useState<PaymentMethods | null>(PaymentMethods.Crypto);
  const [selectedCrypto, setSelectedCrypto] = useState<PaymentOption | null>(null);

  const {
    data: paymentRequest,
    mutate: createPaymentRequest,
    isError: isPaymentRequestError,
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

  const { data: details, isLoading: isDetailsLoading, isError: isDetailsError } = usePaymentDetails(token, activeStep);
  const status = details?.data.status;

  const { mutate, isError: isCancelPaymentError } = useCancelPaymentRequest();

  const hasError = isPaymentRequestError || isDetailsError || isCancelPaymentError;

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

  const handleBackStep = () => {
    if (activeStep === 2) {
      handleClose();
      return;
    }

    setActiveStep((prev) => prev - 1);
  };

  const handleSelectCrypto = (index: number, list?: PaymentOption[]) => () => {
    if (!list) return;

    if (list[index].currencyTitle === selectedCrypto?.currencyTitle) {
      setSelectedCrypto(null);
    } else setSelectedCrypto(list[index]);
  };

  const renderCryptoSteps = (step: number) => {
    if (hasError) {
      return (
        <div className="error-container">
          <div className="text">An error occurred during the payment process.</div>
          <Button variant="secondary" onClick={handleClose}>
            Back to merchant
          </Button>
        </div>
      );
    }

    switch (step) {
      case 2:
        return (
          <ConnectWallet
            onClose={handleBackStep}
            onNext={handleNextStep}
            onSelect={handleSelectCrypto}
            selectedCrypto={selectedCrypto}
            token={token}
          />
        );
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
            selectedCrypto={selectedCrypto}
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
      {!hasError && method && activeStep <= PAYMENT_METHOD_STEPS[method].length && (
        <Stepper steps={PAYMENT_METHOD_STEPS[method]} activeStep={activeStep} />
      )}
      {method === PaymentMethods.Crypto && renderCryptoSteps(activeStep)}
    </div>
  );
};

export default PaymentWidget;
