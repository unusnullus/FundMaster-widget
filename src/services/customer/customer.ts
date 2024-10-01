import { AxiosResponse } from "axios";
import $api from "..";
import { CustomerOptionsResponse, PaymentRequest } from "../../types/merchant";

export default class CustomerService {
  static async getPaymentOptions(token: string): Promise<AxiosResponse<CustomerOptionsResponse>> {
    return $api.get("/api/customer/payment-request/with-payment-options", {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  static async selectPaymentMethod(
    token: string,
    currencyName: string,
    networkCode: string
  ): Promise<AxiosResponse<PaymentRequest>> {
    return $api.post(
      "/api/customer/payment-request/pay-in",
      { currencyName, networkCode },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }

  static async getPaymentRequest(token: string): Promise<AxiosResponse<PaymentRequest>> {
    return $api.get("/api/customer/payment-request", {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}
