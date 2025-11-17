import { createClient } from "@/utils/supabase/server";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import React from "react";
import MobileNav from "./MobileNav";

const Navbar = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <section className=" py-5 px-4 sm:px-6 lg:px-10 w-full flex justify-between items-center border-b">
      <Link href={"/"} className=" flex items-center gap-1.5 ">
        <BookOpen className=" w-7 h-7 text-primary" />
        <span className=" font-semibold text-2xl">FluencyWave</span>
      </Link>
      <div className=" hidden lg:flex gap-8">
        <Link
          className=" font-medium hover:text-neutral-700 hover:underline underline-offset-2 "
          href={"#features"}
        >
          Features
        </Link>
        <Link
          className=" font-medium hover:text-neutral-700 hover:underline underline-offset-2 "
          href={"#pricing"}
        >
          Pricing
        </Link>
        <Link
          className=" font-medium hover:text-neutral-700 hover:underline underline-offset-2 "
          href={"#FAQ"}
        >
          FAQ
        </Link>
      </div>
      {user ? (
        <Link
          href="/books"
          className="py-2 px-5 text-white bg-primary font-semibold hover:shadow-[4px_4px_#03045e] rounded-lg hidden md:block duration-500  cursor-pointer"
        >
          dashboard
        </Link>
      ) : (
        <Link
          href="/login"
          className="py-2 px-5 text-white bg-primary font-semibold hover:shadow-[4px_4px_#03045e]  rounded-lg hidden md:block duration-500  cursor-pointer"
        >
          Login
        </Link>
      )}

      <MobileNav user={user} />
    </section>
  );
};

export default Navbar;
