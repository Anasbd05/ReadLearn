import { BookOpen } from "lucide-react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <section className=" py-5 px-20 flex justify-between items-center border-b">
      <Link href={"/"} className=" flex items-center gap-1.5 ">
        <BookOpen className=" w-7 h-7 text-primary" />
        <span className=" font-semibold text-2xl">FluentsRead</span>
      </Link>
      <div className=" hidden lg:flex gap-8">
        <Link
          className=" font-medium hover:text-neutral-700 hover:underline underline-offset-2 "
          href={"/"}
        >
          Features
        </Link>
        <Link
          className=" font-medium hover:text-neutral-700 hover:underline underline-offset-2 "
          href={"/"}
        >
          Pricing
        </Link>
        <Link
          className=" font-medium hover:text-neutral-700 hover:underline underline-offset-2 "
          href={"/"}
        >
          Faqs
        </Link>
      </div>
      <Link
        href="/login"
        className=" rounded-full text-white border-black py-1.5 duration-500 px-7 font-medium border-[1.5px] hover:shadow-[3px_3px_#000] bg-secondary "
      >
        Login
      </Link>
    </section>
  );
};

export default Navbar;
