import { AxiosResponse } from "axios";
import $api from "..";
import { MerchantPaymentRequest, MerchantPaymentRequestResponse } from "../../types/merchant";

export default class MerchantService {
  static async createPaymentRequest(
    data: MerchantPaymentRequest,
    signal: AbortSignal
  ): Promise<AxiosResponse<MerchantPaymentRequestResponse>> {
    return $api.post("/api/merchant/payment-request", data, { signal });
  }
  static async cancelPaymentRequest(id: number): Promise<AxiosResponse<PaymentRequest>> {
    return $api.post(`/api/merchant/payment-request/${id}/cancel`);
  }
}
