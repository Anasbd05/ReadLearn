"use client";

import { useState, useEffect } from "react";
import PricingCards from "@/components/landingpage/PricingCards";
import { Loader2 } from "lucide-react";

type Product = {
  product_id: number;
  name: string;
  description: string;
  price: number; // in cents
  is_recurring: boolean;
  billing_period?: "monthly" | "3months" | "6months";
};

export default function Pricing() {
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
      </div>

      {loading ? (
        <div className="w-full min-h-screen bg-muted/50 rounded-xl p-6 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-gray-600">Loading pricing plans...</p>
          </div>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  mx-auto gap-10">
          {products.length > 0 ? (
            products.map((product: Product) => (
              <PricingCards key={product.product_id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-gray-500">
              No plans available
            </div>
          )}
        </div>
      )}
    </section>
  );
}
