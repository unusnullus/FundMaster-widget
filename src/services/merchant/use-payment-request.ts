import { useMutation } from "@tanstack/react-query";
import MerchantService from "./merchant";
import { MerchantPaymentRequest } from "../../types/merchant";

export const usePaymentRequest = (data: MerchantPaymentRequest, signal: AbortSignal, onError: () => void) =>
  useMutation({
    mutationKey: ["merchant-payment-method"],
    mutationFn: () => {
      return MerchantService.createPaymentRequest(data, signal);
    },
    onError,
  });
