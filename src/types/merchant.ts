import { STATUSES } from "constants/enums";

export interface MerchantPaymentRequest {
  uid: string;
  operationId: string;
  baseCurrencyName?: string;
  baseAmount?: string;
  title?: string;
  description?: string;
}

export interface PaymentRequest {
  id: number;
  address: string;
  baseCurrencyName: string;
  currencyName: string;
  expirationDate: string;
  operationId: string;
  status: STATUSES;
  uid: string;
  userId: number;
  amount: string;
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
}

export interface CustomerOptionsResponse {
  paymentRequest: PaymentRequest;
  paymentOptions: PaymentOption[];
}
