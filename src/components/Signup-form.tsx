"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { supabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export function SignupForm({
  className,
  searchParams,
  ...props
}: {
  searchParams: { message: string; code: string };
} & React.ComponentProps<"form">) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const signUp = async (formData: FormData) => {
    setLoading(true);
    setError(null);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmpassword = formData.get("confirmpassword") as string;

    if (password !== confirmpassword) {
      setError("Passwords don't match");
      setLoading(false);
      return;
    }

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/login`,
      },
    });

    setLoading(false);

    if (signUpError) {
      // Check if the error is because user already exists
      if (
        signUpError.message.includes("already registered") ||
        signUpError.message.includes("User already registered")
      ) {
        setError("This email is already signed up. Please go to login.");
      } else {
        setError(signUpError.message);
      }
      console.log(signUpError.message);
    } else {
      router.push("/signup?message=signup-success");
    }
  };

  return (
    <form
      action={signUp}
      className={cn(
        "flex flex-col border p-7 bg-white shadow-md rounded-lg gap-6",
        className
      )}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create an account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to Sign up
        </p>
      </div>
      <div className="grid gap-5">
        <div className="grid gap-1">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="m@example.com"
            required
            disabled={loading}
          />
        </div>
        <div className="grid gap-1">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            disabled={loading}
          />
        </div>
        <div className="grid gap-1">
          <Label htmlFor="Confirmpassword">Confirm password</Label>
          <Input
            id="Confirmpassword"
            name="confirmpassword"
            type="password"
            required
            disabled={loading}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign up"}
          </Button>

          {/* Error message */}
          {error && (
            <p className="text-red-600 text-sm text-center">
              {error}
              {error.includes("already signed up") && (
                <>
                  {" "}
                  <Link href="/login" className="underline font-medium">
                    Go to login
                  </Link>
                </>
              )}
            </p>
          )}

          {/* Success message */}
          {searchParams?.message === "signup-success" && (
            <p className="text-green-600 text-sm text-center">
              We&lsquo;ve sent you a verification email. Click the link inside
              to finalize your signup.
            </p>
          )}
        </div>
      </div>
      <div className="text-center text-sm">
        have an account?{" "}
        <Link href="/login" className="underline underline-offset-4">
          Login
        </Link>
      </div>
    </form>
  );
}
