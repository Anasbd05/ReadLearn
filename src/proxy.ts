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

  // Define protected routes that require authentication
  const protectedRoutes = [
    "/books",
    "/custom-text",
    "/content-generator",
    "/onboarding",
    "/billing",
  ];

  // Define routes that require a paid plan
  const paidRoutes = ["/books", "/custom-text", "/content-generator"];

  // Check if current path is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    currentPath.startsWith(route)
  );

  // Check if current path requires paid plan
  const isPaidRoute = paidRoutes.some((route) => currentPath.startsWith(route));

  // If user is NOT logged in
  if (!user) {
    // If trying to access protected route, redirect to login
    if (isProtectedRoute) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    // Allow access to public routes
    return response;
  }

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

    // 2. Check plan for paid routes
    if (isPaidRoute) {
      if (!userData?.plan || userData.plan === "free") {
        return NextResponse.redirect(new URL("/billing", request.url));
      }
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
