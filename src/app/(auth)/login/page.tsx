import { LoginForm } from "@/components/login-form";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await (await supabase).auth.getUser();

  if (user) {
    redirect("/books");
  }
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <Link href={"/"} className=" flex items-center justify-center gap-1">
        <Image
          alt="fluencywave logo"
          width={24}
          height={24}
          className=" w-6 h-6"
          src={"/logo.png"}
        />
        <span className=" font-semibold text-xl">FluencyWave</span>
      </Link>
      <div className="flex w-full max-w-md flex-col gap-6">
        <LoginForm />
      </div>
    </div>
  );
}
