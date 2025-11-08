import { LoginForm } from "@/components/login-form";
import { BookOpen } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <Link href={"/"} className=" flex items-center justify-center gap-1">
        <BookOpen className=" w-6 h-6 text-primary" />
        <span className=" font-semibold text-xl">FluentsRead</span>
      </Link>
      <div className="flex w-full max-w-md flex-col gap-6">
        <LoginForm />
      </div>
    </div>
  );
}
