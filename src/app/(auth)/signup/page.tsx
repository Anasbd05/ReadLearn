import { Suspense } from "react";
import { SignupForm } from "@/components/Signup-form";
import Link from "next/link";
import { BookOpen, LoaderIcon } from "lucide-react";

interface PageProps {
  searchParams: Promise<{
    message?: string;
    code?: string;
  }>;
}

function SignupLoader() {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="flex flex-col items-center gap-4">
        <LoaderIcon className="animate-spin h-8 w-8 text-primary" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}

export default async function SignupPage({ searchParams }: PageProps) {
  // Await the searchParams Promise
  const params = await searchParams;

  return (
    <Suspense fallback={<SignupLoader />}>
      <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <Link href={"/"} className=" flex items-center justify-center gap-1">
          <BookOpen className=" w-6 h-6 text-primary" />
          <span className=" font-semibold text-xl">FluentsRead</span>
        </Link>
        <div className="flex w-full max-w-md flex-col gap-6">
          <SignupForm
            searchParams={{
              message: params?.message || "",
              code: params?.code || "",
            }}
          />
        </div>
      </div>
    </Suspense>
  );
}
