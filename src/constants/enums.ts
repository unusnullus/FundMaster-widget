export enum PaymentVariants {
  Deposit = "Deposit",
  Buy = "Buy",
}

export enum PaymentMethods {
  Card = "Card",
  Crypto = "Crypto",
}

export enum STATUSES {
  ChoosePaymentMethod = "CHOOSE_PAYMENT_METHOD",
  WaitingForAddress = "WAITING_FOR_ADDRESS",
  WaitingForPayment = "WAITING_FOR_PAYMENT",
  PartiallyPaid = "PARTIALLY_PAID",
  Paid = "PAID",
  Expired = "EXPIRED",
  Canceled = "CANCELED",
}
