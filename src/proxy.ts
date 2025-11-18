/* eslint-disable @typescript-eslint/no-explicit-any */
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: any) {
          request.cookies.set({
            name,
            value: "",
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const currentPath = request.nextUrl.pathname;

  // If user IS logged in
  if (user) {
    // Fetch user data including onboarding status and plan
    const { data: userData } = await supabase
      .from("users") //
      .select("onboarding_completed, plan")
      .eq("id", user.id)
      .single();

    // 1. Check onboarding completion
    if (
      !userData?.onboarding_completed &&
      !currentPath.startsWith("/onboarding")
    ) {
      return NextResponse.redirect(new URL("/onboarding", request.url));
    }

    // If user completed onboarding and is on onboarding page, redirect to books
    if (
      userData?.onboarding_completed &&
      currentPath.startsWith("/onboarding")
    ) {
      return NextResponse.redirect(new URL("/books", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
