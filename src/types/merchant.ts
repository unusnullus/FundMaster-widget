import { STATUSES } from "constants/enums";

export interface MerchantPaymentRequest {
  uid: string;
  operationId: string;
  baseCurrencyName?: string;
  baseAmount?: string;
  title?: string;
  description?: string;
  redirectUrl: string;
}

export interface PaymentRequest {
  id: number;
  address: string;
  baseCurrencyName: string;
  currencyName: string;
  externalPaymentUrl: string;
  expirationDate: string;
  operationId: string;
  status: STATUSES;
  uid: string;
  userId: number;
  amount: string;
  baseAmount: string;
  title?: string;
  description?: string;
  exchangeRate: string;
}

export interface MerchantPaymentRequestResponse {
  customerToken: string;
  paymentRequest: PaymentRequest;
}

export interface PaymentOption {
  currencyCode: string;
  currencyTitle: string;
  networkCode: string;
  amount: string;
  isFiat: boolean;
}

export interface CustomerOptionsResponse {
  paymentRequest: PaymentRequest;
  paymentOptions: PaymentOption[];
}
