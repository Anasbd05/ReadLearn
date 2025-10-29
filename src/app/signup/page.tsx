import { Suspense } from "react";
import { SignupForm } from "@/components/Signup-form";
import Image from "next/image";
import Link from "next/link";
import { LoaderIcon } from "lucide-react";

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
      <div className="flex items-center justify-center w-full h-screen">
        <div className="flex flex-col items-center w-full gap-4 p-4 md:p-6">
          <div className="flex justify-center gap-2">
            <Link href="/" className="flex items-center gap-2 font-medium">
              <div className="bg-black text-primary-foreground flex size-6 items-center justify-center rounded-md">
                <Image
                  width={20}
                  height={20}
                  className="w-6 h-6"
                  alt="Logo image"
                  src={"/logo.png"}
                />
              </div>
              ReelCaptions
            </Link>
          </div>
          <div className="w-full max-w-sm shadow-sm p-4 rounded-lg">
            <SignupForm
              searchParams={{
                message: params?.message || "",
                code: params?.code || "",
              }}
            />
          </div>
        </div>
      </div>
    </Suspense>
  );
}
