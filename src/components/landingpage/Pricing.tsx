import { plans } from "@/assets/assets";
import { Check } from "lucide-react";
import React from "react";

const Pricing = () => {
  return (
    <section id="pricing" className="py-16 px-4 sm:px-6 lg:px-10 md:py-24 ">
      <div className="text-center mb-16 space-y-4 animate-fade-in">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
          Your Fluent Future Starts Here
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Flexible plans designed to help you learn faster and stay consistent.
        </p>
      </div>
      <main className=" grid grid-cols-2 w-10/12 mx-auto gap-10 ">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={` p-6 shadow-lg flex flex-col h-full gap-5 lg:gap-7 rounded-lg ${
              plan.name === "Pro"
                ? " border-2 border-[#132440]"
                : " border border-muted "
            } `}
          >
            <div>
              <h2 className="text-lg lg:text-xl font-bold ">{plan.name}</h2>
              <p className=" mt-1 text-neutral-700">{plan.description}</p>
            </div>
            <div className="flex gap-1 items-end">
              <h1 className="text-5xl tracking-tight font-extrabold">
                ${plan.monthlyPrice}
              </h1>
              <span className=" text-neutral-500 lg:text-lg font-medium ">
                /month
              </span>
            </div>
            <ul className=" flex flex-col gap-3 ">
              {plan.features.map((feature, index) => (
                <div className=" flex gap-2 items-center " key={index}>
                  <Check className=" text-primary w-5 h-5 " />
                  <p className=" font-bold">{feature}</p>
                </div>
              ))}
            </ul>
            <button className=" hover:bg-secondary py-2.5 cursor-pointer bg-[#132440] hover:-translate-1 duration-500 hover:shadow-[3px_3px_#000] rounded-full w-full text-white font-semibold ">
              Choose plan
            </button>
          </div>
        ))}
      </main>
    </section>
  );
};

export default Pricing;
