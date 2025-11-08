import { redirect } from "next/navigation";
import React from "react";
import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { BookOpen } from "lucide-react";

interface PageProps {
  searchParams: Promise<{
    message?: string;
    code?: string;
  }>;
}

const Page = async ({ searchParams }: PageProps) => {
  // Await the searchParams Promise
  const params = await searchParams;

  // Server action handler
  const newPassword = async (formData: FormData) => {
    "use server";

    const password = formData.get("password") as string;
    const confirmpassword = formData.get("confirmpassword") as string;

    if (password !== confirmpassword) {
      redirect(
        `/reset-password?message=${encodeURIComponent(
          "Passwords do not match!"
        )}&code=${params.code ?? ""}`
      );
    }

    if (params.code) {
      const supabase = await createClient();
      const { error } = await supabase.auth.exchangeCodeForSession(params.code);

      if (error) {
        return redirect(
          `/reset-password?message=${encodeURIComponent(
            "Unable to reset Password. Link expired!"
          )}`
        );
      }
    }

    const supabase = await createClient();
    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      console.log(error);
      return redirect(
        `/reset-password?message=${encodeURIComponent(
          "Unable to reset Password. Try again!"
        )}&code=${params.code ?? ""}`
      );
    }

    redirect(
      `/login?message=${encodeURIComponent(
        "Your Password has been reset successfully. Sign in."
      )}`
    );
  };

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="flex flex-col items-center w-full gap-4 p-4 md:p-6">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href={"/"} className=" flex items-center justify-center gap-1">
            <BookOpen className=" w-6 h-6 text-primary" />
            <span className=" font-semibold text-xl">FluentsRead</span>
          </Link>
        </div>
        <div className="flex w-full max-w-md flex-col gap-6">
          <form
            action={newPassword}
            className="flex flex-col border p-7 bg-white shadow-md rounded-lg gap-6"
          >
            <div className="flex flex-col items-center gap-2 text-center">
              <h1 className="text-2xl font-bold">New Password</h1>
              <p className="text-muted-foreground text-sm text-balance">
                Enter your new password below
              </p>
            </div>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" name="password" required />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="confirmpassword">Confirm password</Label>
                <Input
                  id="confirmpassword"
                  type="password"
                  name="confirmpassword"
                  required
                />
              </div>
              <Button type="submit" className="w-full cursor-pointer">
                Submit
              </Button>
              {params?.message && (
                <p
                  className={`text-center text-sm ${
                    params.message.toLowerCase().includes("success")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {params.message}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
