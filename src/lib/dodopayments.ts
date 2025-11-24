import DodoPayments from "dodopayments";

const apiKey = process.env.DODO_API_KEY_LIVE; // Use live key explicitly

if (!apiKey) {
  throw new Error("Missing DODO_API_KEY_LIVE - required for production");
}

export const dodopayments = new DodoPayments({
  bearerToken: apiKey,
  environment: "live_mode",
});
