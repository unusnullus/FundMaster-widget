import { useQuery } from "@tanstack/react-query";
import CustomerService from "./customer";

export const usePaymentDetails = (token: string, activeStep: number) => {
  return useQuery({
    queryKey: ["customer-payment-request", token],
    queryFn: () => CustomerService.getPaymentRequest(token),
    enabled: !!token && activeStep > 2,
    refetchInterval: 1500,
  });
};
