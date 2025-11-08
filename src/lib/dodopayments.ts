import DodoPayments from "dodopayments";

// Use live mode - make sure you have live products configured
const apiKey =
  process.env.DODO_API_KEY_LIVE ||
  process.env.DODO_PAYMENTS_API_KEY ||
  process.env.DODO_API_KEY_TEST;

if (!apiKey) {
  console.error("Missing Dodopayments API key");
  throw new Error("Missing required Dodopayments API key");
}

export const dodopayments = new DodoPayments({
  bearerToken: apiKey,
  environment: "live_mode", // Changed to live_mode
});

console.log("Dodopayments initialized in live mode");
