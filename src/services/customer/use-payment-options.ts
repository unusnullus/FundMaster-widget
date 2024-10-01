import { useQuery } from "@tanstack/react-query";
import CustomerService from "./customer";

export const usePaymentOptions = (token: string) =>
  useQuery({
    queryKey: ["customer-payment-options", token],
    queryFn: () => CustomerService.getPaymentOptions(token),
    enabled: !!token,
  });
