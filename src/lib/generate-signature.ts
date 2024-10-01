import HmacSHA256 from "crypto-js/hmac-sha256";
import Hex from "crypto-js/enc-hex";

export const generateSignature = (url: string, body: string, secret: string, accountId = "") => {
  const data = url + accountId + body;

  const signature = HmacSHA256(data, secret);

  return signature.toString(Hex);
};
