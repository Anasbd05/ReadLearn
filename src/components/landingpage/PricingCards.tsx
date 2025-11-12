/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/utils/supabase/client";
import { Check, Loader2 } from "lucide-react";

type Product = {
  product_id: number;
  name: string;
  description: string;
  price: number; // in cents
  is_recurring: boolean;
};

const MStarterFeatures = [
  "All 6 languages",
  "Unlimited library access",
  "Unlimited vocabulary bookmarks",
  "10 AI content generations per month",
  "Progress analytics",
  "Priority support",
];

const MProFeatures = [
  "All 6 languages",
  "Unlimited library access",
  "Unlimited vocabulary bookmarks",
  "Unlimited AI content generation",
  "Progress analytics",
  "Priority support",
];

const YStarterFeatures = [
  "All 6 languages",
  "Unlimited library access",
  "Unlimited vocabulary bookmarks",
  "100 AI content generations per month",
  "Progress analytics",
  "Priority support",
];
const YProFeatures = [
  "All 6 languages",
  "Unlimited library access",
  "Unlimited vocabulary bookmarks",
  "Unlimited AI content generation",
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

  // ✅ Component UI
  return (
    <div
      className={` p-6 shadow-lg flex flex-col h-full gap-5 lg:gap-7 rounded-lg ${
        product.name === "Pro"
          ? " border-2 border-[#132440]"
          : " border border-muted "
      } `}
    >
      <div>
        <h2 className="text-lg lg:text-xl font-bold ">{product.name}</h2>
        <p className=" mt-1 text-neutral-700">{product.description}</p>
      </div>
      <div className="flex gap-1 items-end">
        <h1 className="text-5xl tracking-tight font-extrabold">
          ${product.price / 100}{" "}
        </h1>
        <span className=" text-neutral-500 lg:text-lg font-medium ">
          /{billingCycle === "monthly" ? "month" : "year"}
        </span>
      </div>

      {/* ✅ Render the features */}
      {billingCycle === "monthly" ? (
        <ul className=" flex flex-col gap-3 ">
          {Mfeatures.map((feature, i) => (
            <div className=" flex gap-2 items-center " key={i}>
              <Check className=" text-primary w-5 h-5 " />
              <p className=" font-bold">{feature}</p>
            </div>
          ))}
        </ul>
      ) : (
        <ul className=" flex flex-col gap-3 ">
          {Yfeatures.map((feature, i) => (
            <div className=" flex gap-2 items-center " key={i}>
              <Check className=" text-primary w-5 h-5 " />
              <p className=" font-bold">{feature}</p>
            </div>
          ))}
        </ul>
      )}

      {user ? (
        <button
          className=" hover:bg-secondary  py-2.5 cursor-pointer bg-[#132440] hover:-translate-1 duration-500 hover:shadow-[3px_3px_#000] rounded-full w-full flex justify-center text-white font-semibold "
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
          className=" hover:bg-secondary  py-2.5 cursor-pointer bg-[#132440] hover:-translate-1 duration-500 hover:shadow-[3px_3px_#000] rounded-full w-full flex justify-center text-white font-semibold "
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
