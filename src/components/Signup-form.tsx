"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { supabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Mail, Check } from "lucide-react";

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
  const [passwordError, setPasswordError] = React.useState<string | null>(null);
  const [userEmail, setUserEmail] = React.useState<string>("");
  const [isCheckingAuth, setIsCheckingAuth] = React.useState(true);
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  // Check if user is already logged in by checking users table
  React.useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        // Check if user exists in users table
        const { data: userData, error: fetchError } = await supabase
          .from("users")
          .select("email")
          .eq("email", user.email)
          .single();

        if (userData && !fetchError) {
          // User exists in database, redirect to home
          router.push("/login");
          return;
        }
      }

      setIsCheckingAuth(false);
    };

    checkUser();
  }, [router]);

  // Validate password when user types in confirm password
  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setConfirmPassword(value);

    // Check if password is less than 8 characters when user starts typing in confirm password
    if (password.length < 8 && value.length > 0) {
      setPasswordError("Password must be at least 8 characters");
    } else if (password.length >= 8) {
      setPasswordError(null);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    // Clear password error if password becomes valid
    if (value.length >= 8) {
      setPasswordError(null);
    }
  };

  const signUp = async (formData: FormData) => {
    setLoading(true);
    setError(null);
    setPasswordError(null);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmpassword = formData.get("confirmpassword") as string;

    // Validate password length
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      setLoading(false);
      return;
    }

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
      setUserEmail(email);
      router.push("/signup?message=signup-success");
    }
  };

  // Show loading while checking authentication
  if (isCheckingAuth) {
    return (
      <div
        className={cn(
          "flex flex-col border p-7 bg-white shadow-md rounded-lg gap-6 items-center justify-center min-h-[400px]",
          className
        )}
      >
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Show success card if signup was successful
  if (searchParams?.message === "signup-success") {
    return (
      <div
        className={cn(
          "flex flex-col border p-7 bg-white shadow-md rounded-lg gap-6 items-center text-center max-w-md",
          className
        )}
      >
        <div className="relative">
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center">
            <Mail className="w-10 h-10 text-secondary" strokeWidth={1.5} />
          </div>
          <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-primary rounded-full flex items-center justify-center border-2 border-white">
            <Check className="w-4 h-4 text-white" strokeWidth={3} />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Check Your Email</h1>
          <p className="text-muted-foreground text-sm">
            We&#39;ve sent a confirmation email to{" "}
            <span className="font-semibold text-foreground">
              {userEmail || "Your Email"}
            </span>
          </p>
        </div>

        <p className="text-sm text-muted-foreground">
          Please click the confirmation link in the email to activate your
          account.
        </p>

        <div className="text-sm">
          Already confirmed?{" "}
          <Link
            href="/login"
            className="hover:text-primary/80 text-primary font-medium"
          >
            Sign in here
          </Link>
        </div>
      </div>
    );
  }

  // Show regular signup form
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
            placeholder="Must be at least 8 characters"
            required
            disabled={loading}
            minLength={8}
            value={password}
            onChange={handlePasswordChange}
            className={passwordError ? "border-red-500" : ""}
          />
          {passwordError && (
            <p className="text-red-600 text-xs mt-1">{passwordError}</p>
          )}
        </div>
        <div className="grid gap-1">
          <Label htmlFor="Confirmpassword">Confirm password</Label>
          <Input
            id="Confirmpassword"
            name="confirmpassword"
            placeholder="Confirm your password"
            type="password"
            required
            disabled={loading}
            minLength={8}
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
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
