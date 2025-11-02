"use client";
import { Button } from "@/components/ui/button";
import { supabase } from "@/utils/supabase/client";
import { ArrowBigLeft, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import React from "react";

interface PageData {
  id: string;
  textTitle: string;
  textContent: string;
}

const Page = ({ params }: { params: Promise<{ title: string }> }) => {
  const { title } = React.use(params);
  const [data, setData] = React.useState<PageData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const route = useRouter();

  React.useEffect(() => {
    const fetchText = async () => {
      try {
        setLoading(true);

        // Get all texts from the table
        const { data: result, error: fetchError } = await supabase
          .from("importedText")
          .select("*");

        if (fetchError) throw fetchError;

        // Find the text where textTitle (without spaces) matches the URL title
        const matchedText = result?.find(
          (item) => item.textTitle.replaceAll(" ", "") === title
        );

        setData(matchedText || null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchText();
  }, [title]);
  const handleDelete = async (textId: string) => {
    try {
      const { error } = await supabase
        .from("importedText")
        .delete()
        .eq("id", textId);

      if (error) {
        console.error("Error deleting text:", error);
        return { success: false, error: error.message };
      }

      // ✅ Navigate to /custom-text after successful delete
      route.push("/custom-text");

      return { success: true, error: null };
    } catch (error) {
      console.error("Error:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "An error occurred",
      };
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h2 className="text-red-800 font-semibold mb-2">Error</h2>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (data) {
    return (
      <section className="w-full min-h-screen bg-muted/50 rounded-xl p-6">
        <div className="max-w-4xl mx-auto p-6">
          <main className=" flex items-center justify-between w-full">
            <Button
              onClick={route.back}
              className=" px-8 cursor-pointer  "
              variant={"outline"}
            >
              <ArrowBigLeft /> Back
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="h-8 cursor-pointer w-8 flex items-center justify-center rounded-md hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors shrink-0">
                  <Trash2 className=" w-6 h-6 " />
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure you want to delete this text?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. It will permanently remove
                    your imported text from the app.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className=" hover:bg-muted/50 cursor-pointer ">
                    Cancel
                  </AlertDialogCancel>
                  <Button
                    className="cursor-pointer"
                    variant={"destructive"}
                    onClick={() => handleDelete(data.id)}
                  >
                    Delete
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </main>
          <h1 className="text-3xl font-bold my-6">{data.textTitle}</h1>
          <div className="prose prose-lg max-w-none leading-relaxed whitespace-pre-wrap">
            {data.textContent}
          </div>
        </div>
      </section>
    );
  }
};
export default Page;
