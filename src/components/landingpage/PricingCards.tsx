/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/utils/supabase/client";
import { Check, Loader2, Star } from "lucide-react";

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
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // ✅ Fetch user once
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();
  }, []);

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

  // ✅ Checkout handler
  const checkoutProduct = async (productId: number, is_recurring: boolean) => {
    if (!user) {
      router.push("/login");
      return;
    }

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
    } finally {
      setLoading(false);
    }
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

  // ✅ Component UI
  return (
    <div
      className={`rounded-2xl shadow-sm py-5 px-6 flex flex-col justify-between ${
        product.name === "Pro"
          ? "border-[.5px] relative border-black"
          : "border-[.5px] border-neutral-200"
      }`}
    >
      <main className="flex flex-col">
        {product.name === "Creators" && (
          <div className="flex gap-2 absolute -top-3 py-1 px-2 bg-black items-center justify-center rounded-md">
            <Star className="w-3 h-3 text-white" />
            <p className="text-xs text-white">Best</p>
          </div>
        )}
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
        <button
          className={`w-full mt-4 rounded-md ${
            product.name === "Pro"
              ? "bg-black hover:opacity-85 flex justify-center duration-500 border-[.3px] text-white cursor-pointer font-medium py-2.5"
              : "bg-gray-50 hover:bg-gray-200 flex justify-center duration-500 border-[.3px] border-neutral-200 cursor-pointer font-medium py-2.5"
          }`}
          onClick={() =>
            checkoutProduct(product.product_id, product.is_recurring)
          }
        >
          {loading ? (
            <div className=" flex gap-2 justify-center items-center ">
              <Loader2 className="animate-spin w-5 h-5 text-center" />
              <p>Choose plan</p>
            </div>
          ) : (
            "Choose plan"
          )}
        </button>
      ) : (
        <Link
          href="/login"
          className={`w-full mt-4 rounded-md ${
            product.name === "Pro"
              ? "bg-black hover:opacity-85 flex justify-center duration-500 border-[.3px] text-white cursor-pointer font-medium py-2.5"
              : "bg-gray-50 hover:bg-gray-200 flex justify-center duration-500 border-[.3px] border-neutral-200 cursor-pointer font-medium py-2.5"
          }`}
        >
          {loading ? (
            <div className=" flex gap-2 justify-center items-center ">
              <Loader2 className="animate-spin w-5 h-5 text-center" />
              <p>Choose plan</p>
            </div>
          ) : (
            "Choose plan"
          )}
        </Link>
      )}
    </div>
  );
};

export default PricingCards;
