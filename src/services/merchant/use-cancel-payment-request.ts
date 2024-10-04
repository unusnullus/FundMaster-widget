import { useMutation } from "@tanstack/react-query";
import MerchantService from "./merchant";

export const useCancelPaymentRequest = (onError: () => void) =>
  useMutation({
    mutationKey: ["cancel-merchant-payment-request"],
    mutationFn: (id?: number) => {
      if (id) return MerchantService.cancelPaymentRequest(id);

      return Promise.reject();
    },
    onError,
  });
