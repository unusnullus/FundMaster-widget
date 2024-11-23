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
import CloseIcon from "./assets/close.svg";
import SelectPayment from "./components/select-payment";
import CardDetails from "./components/card-details";

interface PaymentDialogProps {
  onClose: () => void;
  uid: string;
  operationId: string;
  title?: string;
  description?: string;
  baseAmount?: string;
  baseCurrencyName?: string;
}

const PaymentWidget = ({
  onClose,
  title,
  description,
  uid,
  operationId,
  baseAmount,
  baseCurrencyName,
}: PaymentDialogProps) => {
  const abortController = new AbortController();

  const [activeStep, setActiveStep] = useState(2);
  const [method, setMethod] = useState<PaymentMethods | null>(null);
  const [selectedCrypto, setSelectedCrypto] = useState<PaymentOption | null>(null);
  const [error, setError] = useState(false);

  const handleError = () => {
    setError(true);
  };

  const {
    data: paymentRequest,
    mutate: createPaymentRequest,
    reset,
  } = usePaymentRequest(
    {
      uid,
      operationId,
      title,
      description,
      baseAmount,
      baseCurrencyName,
    },
    abortController.signal,
    handleError
  );

  const token = paymentRequest?.data.customerToken ?? "";
  const requestId = paymentRequest?.data.paymentRequest.id;

  const { data: details, isLoading: isDetailsLoading, isError: isDetailsError } = usePaymentDetails(token, activeStep);
  const status = details?.data.status;

  const { mutate } = useCancelPaymentRequest(handleError);

  useEffect(() => {
    if (!baseAmount) setMethod(PaymentMethods.Crypto);
  }, [baseAmount]);

  useEffect(() => {
    if (isDetailsError) {
      handleError();
    }
  }, [isDetailsError]);

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

  const handleSelectPayment = (value: PaymentMethods) => () => {
    setMethod(value);
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
    if (error) {
      return (
        <div className="error-container">
          <div className="text-container">
            <div className="error">
              <div className="circle">
                <CloseIcon width="24" height="24" />
              </div>
            </div>
            <div className="text">An error occurred during the payment process</div>
          </div>
          <div className="back-button">
            <Button variant="secondary" onClick={handleClose}>
              Back to merchant
            </Button>
          </div>
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
            onError={handleError}
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
            onError={handleError}
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

  const renderCardSteps = (step: number) => {
    switch (step) {
      case 2:
        return <CardDetails onClose={handleBackStep} onNext={handleNextStep} />;
      case 3:
        return (
          <OrderSummary
            title={details?.data.title}
            description={details?.data.description}
            currencyName={details?.data.currencyName || details?.data.baseCurrencyName}
            amount={details?.data.amount || details?.data.baseAmount}
            isLoading={isDetailsLoading}
            onClose={handleBackStep}
            onNext={handleNextStep}
          />
        );
      case 4:
        return <PaymentStatus onClose={handleClose} />;
    }
  };

  return (
    <div className="widget-container">
      <style>{styles.toString()}</style>
      {!error && method && activeStep <= PAYMENT_METHOD_STEPS[method].length && (
        <Stepper steps={PAYMENT_METHOD_STEPS[method]} activeStep={activeStep} />
      )}
      {!method && <SelectPayment onClick={handleSelectPayment} onClose={handleClose} />}
      {method === PaymentMethods.Crypto && renderCryptoSteps(activeStep)}
      {method === PaymentMethods.Card && renderCardSteps(activeStep)}
    </div>
  );
};

export default PaymentWidget;
