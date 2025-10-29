import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <section className=" py-4 px-20 flex justify-between items-center border-b">
      <Link href={"/"}>
        <Image
          src={"/logo.png"}
          alt=""
          width={40}
          height={40}
          className="w-14 sm:w-[50px] h-auto "
        />
      </Link>
      <div className=" hidden lg:flex gap-8">
        <Link className=" font-medium hover:text-neutral-700 " href={"/"}>
          Pricing
        </Link>
        <Link className=" font-medium hover:text-neutral-700 " href={"/"}>
          Features
        </Link>
        <Link className=" font-medium hover:text-neutral-700 " href={"/"}>
          Faqs
        </Link>
      </div>
      <button className=" rounded-full text-white border-black py-2 px-7 font-medium border-2 hover:shadow-[3px_3px_#000] bg-chart-3 ">
        Login
      </button>
    </section>
  );
};

export default Navbar;
