import { useMutation } from "@tanstack/react-query";
import CustomerService from "./customer";

export const usePayIn = () =>
  useMutation({
    mutationKey: ["customer-pay-in"],
    mutationFn: ({ token, currencyName, networkCode }: { token: string; currencyName: string; networkCode: string }) =>
      CustomerService.selectPaymentMethod(token, currencyName, networkCode),
  });
