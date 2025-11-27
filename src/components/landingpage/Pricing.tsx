"use client";

import { useState, useEffect } from "react";
import PricingCards from "@/components/landingpage/PricingCards";

type Product = {
  product_id: number;
  name: string;
  description: string;
  price: number;
  is_recurring: boolean;
  billing_period?: "monthly" | "yearly";
};

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/products");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Check if data is an array
        if (Array.isArray(data)) {
          setProducts(data);
        } else if (data.error) {
          throw new Error(data.error);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (error) {
        console.error("Error fetching Products:", error);
        setError(
          error instanceof Error ? error.message : "Failed to load products"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter products based on billing cycle
  const filteredProducts = products.filter((product) => {
    // If price > $60 (6000 cents) = Yearly plan
    // If price <= $60 (6000 cents) = Monthly plan
    if (billingCycle === "monthly") {
      return product.price <= 4000; // $60 or less = monthly plans
    } else {
      return product.price > 4000; // More than $60 = yearly plans
    }
  });

  return (
    <section id="pricing" className="py-16 px-4 sm:px-6 lg:px-10 md:py-24 ">
      <div className="flex flex-col items-center gap-2 mb-8">
        <div className="text-center mb-8 space-y-4 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Your Fluent Future Starts Here
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Flexible plans designed to help you learn faster and stay
            consistent.
          </p>
        </div>

        {/* Billing Cycle Toggle */}
        <div className="flex items-center gap-4 mt-6 p-1 bg-gray-100 rounded-lg">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-6 py-2  cursor-pointer rounded-md font-medium transition-all duration-200 ${
              billingCycle === "monthly"
                ? "bg-white text-black shadow-sm"
                : "text-gray-600 hover:text-black"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle("yearly")}
            className={`px-6 py-2 cursor-pointer  rounded-md font-medium transition-all duration-200 flex items-center gap-2 ${
              billingCycle === "yearly"
                ? "bg-white text-black shadow-sm"
                : "text-gray-600 hover:text-black"
            }`}
          >
            Yearly
            <span className="text-xs bg-green-200 text-black px-2 py-0.5 rounded">
              2 months free
            </span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="text-red-500 text-center">
            <p className="font-semibold">Error loading products</p>
            <p className="text-sm mt-2">{error}</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
          >
            Retry
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 w-10/12 mx-auto gap-10">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product: Product) => (
              <PricingCards
                key={product.product_id}
                product={product}
                billingCycle={billingCycle}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-gray-500">
              No plans available for {billingCycle} billing
            </div>
          )}
        </div>
      )}
    </section>
  );
}
