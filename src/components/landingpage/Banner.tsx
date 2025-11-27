import React from "react";
import { cn } from "@/lib/utils";
import { BooksCover } from "@/assets/assets";
import Image from "next/image";
import { StaticImageData } from "next/image";
import { Marquee } from "../ui/marquee";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

const firstRow = BooksCover.slice(0, BooksCover.length / 2);
const secondRow = BooksCover.slice(BooksCover.length / 2);

const supabase = await createClient();

const {
  data: { user },
} = await supabase.auth.getUser();

const BookCard = ({ cover, alt }: { cover: StaticImageData; alt: string }) => {
  return (
    <figure
      className={cn(
        "relative h-[300px] w-52 cursor-pointer overflow-hidden rounded-xl border",
        "border-gray-950/10 bg-gray-950/1 hover:bg-gray-950/5",
        "shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
      )}
    >
      <Image
        className="w-full h-full object-cover"
        src={cover}
        alt={alt}
        loading="lazy"
      />
    </figure>
  );
};

const Banner = () => {
  return (
    <section className="bg-linear-to-br from-orange-50 via-amber-50 to-orange-100 py-16 px-4 w-full relative overflow-hidden">
      {/* Decorative orange circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-300 rounded-full blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2"></div>

      <div className="text-center mb-16 space-y-4 animate-fade-in">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
          Some Books to Improve Vocabulary
        </h2>
        <p className=" sm:text-lg md:text-xl max-w-3xl mx-auto text-orange-900 font-semibold">
          Expand your vocabulary through reading develop fluency, boost
          comprehension, and communicate like a native speaker
        </p>
      </div>

      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        <Marquee pauseOnHover className="[--duration:25s] mb-6">
          {firstRow.map((book, index) => (
            <BookCard key={index} {...book} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:25s]">
          {secondRow.map((book, index) => (
            <BookCard key={index} {...book} />
          ))}
        </Marquee>
        {/* <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r"></div>
        <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l"></div> */}
      </div>

      <div className="text-center mt-12">
        {user ? (
          <Link
            href={"/books"}
            className="bg-linear-to-r from-orange-600 to-amber-600 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Start Reading Now
          </Link>
        ) : (
          <Link
            href={"/login"}
            className="bg-linear-to-r from-orange-600 to-amber-600 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Start Reading Now
          </Link>
        )}
      </div>
    </section>
  );
};

export default Banner;
