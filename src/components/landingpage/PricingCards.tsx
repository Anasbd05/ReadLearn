/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/utils/supabase/client";
import { Check, Loader2, Star } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type Product = {
  product_id: number;
  name: string;
  description: string;
  price: number; // in cents
  is_recurring: boolean;
};

const MStarterFeatures = [
  "All 5 languages",
  "Unlimited library access",
  "Unlimited vocabulary bookmarks",
  "10 AI articles & stories generation per month",
  "Progress analytics",
  "Priority support",
];

const MProFeatures = [
  "All 5 languages",
  "Unlimited library access",
  "Unlimited vocabulary bookmarks",
  "30 AI articles & stories generation per month",
  "Progress analytics",
  "Priority support",
];

const YStarterFeatures = [
  "All 5 languages",
  "Unlimited library access",
  "Unlimited vocabulary bookmarks",
  "120 AI articles & stories generation per year",
  "Progress analytics",
  "Priority support",
];
const YProFeatures = [
  "All 5 languages",
  "Unlimited library access",
  "Unlimited vocabulary bookmarks",
  "365 AI articles & stories generation per year",
  "Progress analytics",
  "Priority support",
];

const PricingCards = ({
  product,
  billingCycle,
}: {
  product: Product;
  billingCycle: "monthly" | "yearly";
}) => {
  const [user, setUser] = useState<any | null>(null);
  const [userSubscriptionAmount, setUserSubscriptionAmount] =
    useState<number>(0);
  const [isScheduledForCancellation, setIsScheduledForCancellation] =
    useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [showSwitchDialog, setShowSwitchDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [pendingProductId, setPendingProductId] = useState<number | null>(null);
  const [pendingIsRecurring, setPendingIsRecurring] = useState(false);

  // ✅ Fetch user and their subscription amount + check cancellation status
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);

      if (data.user) {
        // Fetch user's current subscription_amount from database
        const { data: userData } = await supabase
          .from("users")
          .select("subscription_amount")
          .eq("id", data.user.id)
          .single();

        if (userData) {
          setUserSubscriptionAmount(userData.subscription_amount || 0);

          // Check if subscription is scheduled for cancellation
          if (userData.subscription_amount > 0) {
            checkCancellationStatus(data.user.id);
          }
        }
      }
    };
    getUser();
  }, []);

  // ✅ Check if subscription is scheduled for cancellation
  const checkCancellationStatus = async (userId: string) => {
    try {
      const res = await fetch(`/api/subscription/status?userId=${userId}`);
      const data = await res.json();

      if (data.isScheduledForCancellation) {
        setIsScheduledForCancellation(true);
      }
    } catch (err) {
      console.error("Error checking cancellation status:", err);
    }
  };

  // ✅ Determine which features to show
  const Mfeatures =
    product.name.toLowerCase() === "starter"
      ? MStarterFeatures
      : product.name.toLowerCase() === "pro"
      ? MProFeatures
      : [];
  const Yfeatures =
    product.name.toLowerCase() === "starter"
      ? YStarterFeatures
      : product.name.toLowerCase() === "pro"
      ? YProFeatures
      : [];

  // ✅ Checkout handler - now handles plan switching
  const checkoutProduct = async (productId: number, is_recurring: boolean) => {
    if (!user) {
      router.push("/login");
      return;
    }

    // If user is switching plans, show confirmation dialog
    if (userSubscriptionAmount > 0 && !isSubscribedToThisPlan()) {
      const planPrice = product.price / 100;
      const currentPrice = userSubscriptionAmount;
      const isUpgrade = planPrice > currentPrice;

      setPendingProductId(productId);
      setPendingIsRecurring(is_recurring);
      setDialogMessage(
        `You are currently subscribed to a ${currentPrice}/${
          billingCycle === "monthly" ? "month" : "year"
        } plan. ` +
          `Do you want to ${
            isUpgrade ? "upgrade" : "switch"
          } to the ${planPrice}/${
            billingCycle === "monthly" ? "month" : "year"
          } plan? ` +
          `Your current subscription will be cancelled and you'll be charged for the new plan.`
      );
      setShowSwitchDialog(true);
      return;
    }

    await proceedWithCheckout(productId, is_recurring);
  };

  // ✅ Proceed with checkout after confirmation
  const proceedWithCheckout = async (
    productId: number,
    is_recurring: boolean
  ) => {
    setLoading(true);
    try {
      const endpoint = is_recurring
        ? `/api/checkout/subscription?productId=${productId}&userId=${
            user.id
          }&email=${encodeURIComponent(user.email)}&name=${encodeURIComponent(
            user.user_metadata?.name || "Customer"
          )}`
        : `/api/checkout/onetime?productId=${productId}&userId=${user.id}`;

      const res = await fetch(endpoint, { cache: "no-store" });
      const data = await res.json();

      const link =
        data.payment_link ??
        data.url ??
        `https://test.checkout.dodopayments.com/buy/${productId}?quantity=1&redirect_url=${process.env.NEXT_PUBLIC_BASE_URL}`;

      window.location.href = link;
    } catch (err) {
      console.error("Checkout error:", err);
      setDialogMessage("An error occurred during checkout. Please try again.");
      setShowErrorDialog(true);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle switch dialog confirmation
  const handleSwitchConfirm = () => {
    setShowSwitchDialog(false);
    if (pendingProductId !== null) {
      proceedWithCheckout(pendingProductId, pendingIsRecurring);
    }
  };

  // ✅ Cancel subscription handler
  const handleCancelSubscription = async () => {
    if (!user) return;
    setShowCancelDialog(true);
  };

  // ✅ Proceed with cancellation after confirmation
  const proceedWithCancellation = async () => {
    setShowCancelDialog(false);
    setCancelling(true);
    try {
      const res = await fetch("/api/subscription/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id }),
      });

      const data = await res.json();

      if (data.success) {
        setDialogMessage(
          "Subscription cancelled! You'll keep access until the end of your billing period."
        );
        setShowSuccessDialog(true);
        setIsScheduledForCancellation(true);
      } else {
        setDialogMessage(data.error || "Failed to cancel subscription");
        setShowErrorDialog(true);
      }
    } catch (err) {
      console.error("Cancel error:", err);
      setDialogMessage("An error occurred while cancelling");
      setShowErrorDialog(true);
    } finally {
      setCancelling(false);
    }
  };

  // ✅ Check if user is subscribed to THIS plan by comparing subscription_amount
  const isSubscribedToThisPlan = () => {
    const planPrice = product.price / 100; // Convert cents to dollars
    return userSubscriptionAmount === planPrice;
  };

  let oldPrice;
  switch (product.price) {
    case 520: // $5.20
      oldPrice = 800; // $8
      break;
    case 910: // $9.10
      oldPrice = 1400; // $14
      break;
    case 5200: // $52
      oldPrice = 8000; // $80
      break;
    case 9100: // $91
      oldPrice = 14000; // $140
      break;
    default:
      oldPrice = product.price; // fallback to same price
  }

  // ✅ Get button text based on subscription status
  const getButtonText = () => {
    if (isSubscribedToThisPlan()) {
      return "Current Plan";
    }
    if (userSubscriptionAmount > 0) {
      const planPrice = product.price / 100;
      const currentPrice = userSubscriptionAmount;
      return planPrice > currentPrice ? "Upgrade Plan" : "Switch Plan";
    }
    return "Choose Plan";
  };

  // ✅ Component UI
  return (
    <div
      className={`rounded-2xl shadow-sm relative py-5 px-6 flex flex-col justify-between ${
        product.name === "Pro"
          ? "border-[.5px] relative border-black"
          : "border-[.5px] border-neutral-200"
      }`}
    >
      <main className="flex flex-col">
        <h2 className="text-xl font-bold text-black capitalize">
          {product.name}
        </h2>

        <p className="text-gray-700 mt-2">{product.description}</p>

        <div className="flex items-center gap-2 ">
          <span className="text-neutral-800 text-3xl line-through">
            ${oldPrice / 100}
          </span>
          <div className="flex my-8 items-end gap-1">
            <p className="font-semibold text-4xl">${product.price / 100}</p>
            <span className="text-neutral-500 text-lg">
              /{billingCycle === "monthly" ? "month" : "year"}
            </span>
          </div>
        </div>
      </main>

      {/* ✅ Render the features */}
      {billingCycle === "monthly" ? (
        <ul className=" flex flex-col gap-2 mb-4 ">
          {Mfeatures.map((feature, i) => (
            <div className=" flex gap-2 items-center " key={i}>
              <Check className=" text-primary w-5 h-5 " />
              <p className="  font-medium text-neutral-800">{feature}</p>
            </div>
          ))}
        </ul>
      ) : (
        <ul className=" flex flex-col gap-2 mb-4 ">
          {Yfeatures.map((feature, i) => (
            <div className=" flex gap-2 items-center " key={i}>
              <Check className=" text-primary w-5 h-5 " />
              <p className=" font-medium text-neutral-800 ">{feature}</p>
            </div>
          ))}
        </ul>
      )}

      {user ? (
        <>
          {isSubscribedToThisPlan() ? (
            <>
              {/* ✅ Show Current Plan badge */}
              <div className="flex gap-2 absolute -top-3 py-1 px-2 right-44 bg-black items-center justify-center rounded-md">
                <Star className="w-3 h-3 text-white" />
                <p className="text-xs text-white">Current Plan</p>
              </div>

              {/* ✅ Show Cancel button below Current Plan button */}
              {!isScheduledForCancellation && (
                <button
                  className="w-full mt-2 rounded-md bg-red-500 hover:bg-red-600 flex justify-center duration-500 border-[.3px] border-red-600 text-white cursor-pointer font-medium py-2.5"
                  onClick={handleCancelSubscription}
                  disabled={cancelling}
                >
                  {cancelling ? (
                    <div className=" flex gap-2 justify-center items-center ">
                      <Loader2 className="animate-spin w-5 h-5 text-center" />
                      <p>Cancelling...</p>
                    </div>
                  ) : (
                    "Cancel Subscription"
                  )}
                </button>
              )}

              {isScheduledForCancellation && (
                <button
                  className="w-full mt-2 rounded-md bg-gray-400 flex justify-center duration-500 border-[.3px] border-gray-500 text-white cursor-not-allowed font-medium py-2.5"
                  disabled
                >
                  Scheduled for Cancellation
                </button>
              )}
            </>
          ) : (
            // ✅ Show Upgrade/Switch Plan button for other plans
            <button
              className={`w-full mt-4 rounded-md ${
                product.name === "Pro"
                  ? "bg-black hover:opacity-85 flex justify-center duration-500 border-[.3px] text-white cursor-pointer font-medium py-2.5"
                  : "bg-gray-50 hover:bg-gray-200 flex justify-center duration-500 border-[.3px] border-neutral-200 cursor-pointer font-medium py-2.5"
              }`}
              onClick={() =>
                checkoutProduct(product.product_id, product.is_recurring)
              }
              disabled={loading}
            >
              {loading ? (
                <div className=" flex gap-2 justify-center items-center ">
                  <Loader2 className="animate-spin w-5 h-5 text-center" />
                  <p>{getButtonText()}</p>
                </div>
              ) : (
                getButtonText()
              )}
            </button>
          )}
        </>
      ) : (
        <Link
          href="/login"
          className={`w-full mt-4 rounded-md ${
            product.name === "Pro"
              ? "bg-black hover:opacity-85 flex justify-center duration-500 border-[.3px] text-white cursor-pointer font-medium py-2.5"
              : "bg-gray-50 hover:bg-gray-200 flex justify-center duration-500 border-[.3px] border-neutral-200 cursor-pointer font-medium py-2.5"
          }`}
        >
          Choose plan
        </Link>
      )}

      {/* ✅ Switch Plan Confirmation Dialog */}
      <AlertDialog open={showSwitchDialog} onOpenChange={setShowSwitchDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Switch Plan?</AlertDialogTitle>
            <AlertDialogDescription>{dialogMessage}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className=" hover:bg-neutral-100 cursor-pointer ">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className=" bg-primary hover:bg-primary/80 cursor-pointer "
              onClick={handleSwitchConfirm}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* ✅ Cancel Subscription Confirmation Dialog */}
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Subscription?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel your subscription? You will keep
              access until the end of your current billing period.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className=" hover:bg-neutral-100 cursor-pointer ">
              No, Keep Subscription
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={proceedWithCancellation}
              className="bg-red-100 text-red-600 hover:bg-red-600 hover:text-white "
            >
              Yes, Cancel
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* ✅ Success Dialog */}
      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Success!</AlertDialogTitle>
            <AlertDialogDescription>{dialogMessage}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* ✅ Error Dialog */}
      <AlertDialog open={showErrorDialog} onOpenChange={setShowErrorDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Error</AlertDialogTitle>
            <AlertDialogDescription>{dialogMessage}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PricingCards;
