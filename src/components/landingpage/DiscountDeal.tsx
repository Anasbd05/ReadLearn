import Link from "next/link";
import React from "react";

const DiscountDeal = () => {
  return (
    <div className="w-full sticky top-0 z-50 backdrop-blur-2xl bg-amber-200 pointer-events-auto cursor-pointer hover:bg-amber-300 transition-colors">
      <Link
        href={"#pricing"}
        className="w-full py-2.5 md:py-3.5 flex items-center justify-center"
      >
        <p className="text-black font-bold text-base text-center px-4">
          USE CODE{" "}
          <span className=" bg-secondary py-0.5 px-1 ">BLACKFRIDAY</span> for
          40% off for 2 months at checkout.
        </p>
      </Link>
    </div>
  );
};

export default DiscountDeal;
