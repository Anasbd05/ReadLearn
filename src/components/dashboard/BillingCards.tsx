"use client";

import { useState, useEffect } from "react";
import PricingCards from "@/components/landingpage/PricingCards";

type Product = {
  product_id: number;
  name: string;
  description: string;
  price: number;
  is_recurring: boolean;
};

export default function BillingCards() {
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
    <section id="pricing" className="px-4 sm:px-6 lg:px-10  ">
      <div className="flex flex-col items-center gap-2 mb-8">
        <p className="text-black text-2xl leading-relaxed font-bold text-center px-4">
          USE CODE
          <span className=" bg-secondary py-0.5 px-1 ">
            BLACKFRIDAY
          </span> <br /> FOR 40% OFF FOR 2 MONTHS AT CHECKOUT!
        </p>
        <p className="text-lg max-w-3xl mx-auto text-muted-foreground">
          Start your language learning journey for less than a coffee
        </p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-10">
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
