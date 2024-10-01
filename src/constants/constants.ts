import { PaymentMethods } from "./enums";

export const PAYMENT_METHOD_STEPS = {
  [PaymentMethods.Card]: [1, 2, 3],
  [PaymentMethods.Crypto]: [1, 2, 3, 4],
};
