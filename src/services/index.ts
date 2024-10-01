import axios from "axios";
import { generateSignature } from "../lib/generate-signature";

const $api = axios.create({
  baseURL: process.env.MERCHANT_API,
  headers: {
    accept: "application/json; charset=UTF-8",
    "Content-Type": "application/json; charset=UTF-8",
    "x-api-key": process.env.API_KEY,
  },
});

$api.interceptors.request.use(
  (config) => {
    const bodyString = config.data ? JSON.stringify(config.data) : "{}";
    const url = config.url || "";
    const secret = process.env.SECRET_KEY || "";

    const signature = generateSignature(url, bodyString, secret);

    if (signature) {
      config.headers["x-signature"] = signature;
    }

    return config;
  },
  (error) => {
    console.error("Error: ", error);
    return Promise.reject(error);
  }
);

export default $api;
