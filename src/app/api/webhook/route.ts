import { Webhook } from "standardwebhooks";
import { headers } from "next/headers";
import { dodopayments } from "@/lib/dodopayments";
import { createClient } from "@supabase/supabase-js";

const webhook = new Webhook(process.env.DODO_PAYMENTS_WEBHOOK_KEY!);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // service key for DB writes
);

export async function POST(request: Request) {
  const headersList = await headers();

  try {
    const rawBody = await request.text();
    const webhookHeaders = {
      "webhook-id": headersList.get("webhook-id") || "",
      "webhook-signature": headersList.get("webhook-signature") || "",
      "webhook-timestamp": headersList.get("webhook-timestamp") || "",
    };

    await webhook.verify(rawBody, webhookHeaders);
    const payload = JSON.parse(rawBody);

    console.log(
      "Webhook payload received:",
      payload.type,
      payload.data.payload_type
    );

    if (payload.data.payload_type === "Subscription") {
      switch (payload.type) {
        case "subscription.active": {
          const subscription = await dodopayments.subscriptions.retrieve(
            payload.data.subscription_id
          );

          console.log("✅ Subscription details:", subscription);

          const userId = subscription.metadata?.user_id;
          const userEmail = subscription.customer?.email;
          const userName = subscription.customer?.name;

          const rawAmount = subscription.recurring_pre_tax_amount || 0;
          const amount = rawAmount / 100; // convert cents to dollars

          // Determine credits based on amount
          let ProductPlan = "free";

          // Starter plans
          if (subscription.product_id === "pdt_wXoCSEAWldmzqUs7hCdKo") {
            ProductPlan = "Starter";
          }
          // Pro PLAN
          if (subscription.product_id === "pdt_rBsSbB6lU1IGCTYyk4kjB") {
            ProductPlan = "Pro";
          }
          // Elite PLAN
          if (subscription.product_id === "pdt_TxZ5kYf0338HRNojwd0mw") {
            ProductPlan = "Elite";
          }

          console.log(
            `✅ User info: id=${userId}, email=${userEmail}, name=${userName}, amount=${amount}`
          );

          if (!userId) {
            console.log("⚠️ No user_id in subscription metadata");
            return Response.json(
              { ok: false, message: "No user_id found" },
              { status: 400 }
            );
          }

          const { error } = await supabase
            .from("users")
            .update({
              plan: ProductPlan,
              subscription_amount: amount,
            })
            .eq("id", userId);

          if (error) {
            console.error("❌ Supabase update failed:", error);
            return Response.json(
              { error: "Database update failed" },
              { status: 500 }
            );
          }

          console.log(`✅ User ${userId} upgraded to paid plan`);
          break;
        }

        case "subscription.cancelled":
        case "subscription.failed": {
          const subscription = await dodopayments.subscriptions.retrieve(
            payload.data.subscription_id
          );
          const userId = subscription.metadata?.user_id;

          if (userId) {
            await supabase
              .from("users")
              .update({
                plan: "free",
                subscription_amount: 0,
              })
              .eq("id", userId);

            console.log(`❌ User ${userId} reverted to free plan`);
          }
          break;
        }
      }
    }

    return Response.json(
      { message: "Webhook processed successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Webhook verification failed:", error);
    return Response.json({ error: "Webhook failed" }, { status: 400 });
  }
}
