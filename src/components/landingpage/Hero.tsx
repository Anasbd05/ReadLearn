import { Play } from "lucide-react";
import heroImage from "@/assets/hero.png";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

export const Hero = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <section
      id="hero"
      className="py-10 relative md:py-8 xl:py-12  bg-linear-to-b from-muted/30 to-background"
    >
      <div className=" px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8 items-center flex-col lg:flex-row ">
          {/* Left Content */}
          <div className="space-y-8 lg:w-3/5 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl  font-bold text-foreground leading-tight">
                Stop breaking your reading flow —
                <span className="text-primary">learn languages </span>
                naturally with instant translations.
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
                Learn English, French, Spanish, German and Chinese by reading
                whatever you like. Click any word for instant translation and
                build your vocabulary naturally.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-row gap-4">
              {user ? (
                <Link
                  href={"/books"}
                  className="bg-primary text-white hover:bg-primary/80 duration-500 cursor-pointer font-semibold px-6 rounded-lg py-3"
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  href={"/login"}
                  className="bg-primary text-white hover:bg-primary/80 duration-500 cursor-pointer font-semibold px-6 rounded-lg py-3"
                >
                  Get Started
                </Link>
              )}
              <Link
                href={"#how-it-works"}
                className="font-semibold flex items-center bg-white text-black duration-500 hover:bg-secondary hover:text-white cursor-pointer border  px-4 rounded-lg py-3 gap-2"
              >
                <Play className="h-5 w-5" />
                How it works
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:w-2/5 ">
            <Image
              src={heroImage}
              draggable="false"
              alt="FluentsRead interface showing translation features"
              className="w-full h-auto  "
            />
            {/* Decorative elements */}
            <div className="absolute top-10 left-40  h-32 w-32 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-4  h-32 w-32 bg-secondary/20 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
};
