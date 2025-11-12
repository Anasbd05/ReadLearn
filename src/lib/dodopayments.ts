import DodoPayments from "dodopayments";

const apiKey =
  process.env.DODO_API_KEY_TEST ||
  process.env.DODO_API_KEY_LIVE ||
  process.env.DODO_PAYMENTS_API_KEY;

if (!apiKey) {
  console.error("Missing Dodopayments API key");
  throw new Error("Missing required Dodopayments API key");
}

// Determine environment based on which key is set or NODE_ENV
const environment =
  process.env.DODO_API_KEY_TEST === apiKey ? "test_mode" : "live_mode";

export const dodopayments = new DodoPayments({
  bearerToken: apiKey,
  environment, // Now matches your key type
});

console.log(`Dodopayments initialized in ${environment}`);
