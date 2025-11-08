import React from "react";
import Link from "next/link";
import ForgetPass from "@/components/ForgetPass";
import { BookOpen } from "lucide-react";

// Updated PageProps to match Next.js 15 async searchParams
interface PageProps {
  searchParams: Promise<{
    message?: string;
    code?: string;
  }>;
}

const Page: React.FC<PageProps> = async ({ searchParams }) => {
  // Await the searchParams Promise
  const params = await searchParams;

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="flex flex-col items-center w-full gap-4 p-4 md:p-6">
        <Link href={"/"} className=" flex items-center justify-center gap-1">
          <BookOpen className=" w-6 h-6 text-primary" />
          <span className=" font-semibold text-xl">FluentsRead</span>
        </Link>
        <div className="flex w-full max-w-md flex-col gap-6">
          <ForgetPass
            searchParams={{
              message: params?.message || "",
              error: params?.code || "",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
