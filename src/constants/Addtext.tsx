"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/utils/supabase/client";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const Addtext = () => {
  const [textTitle, setTextTitle] = useState("");
  const [textContent, setTextContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // Get user on component mount
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      }
    };
    getUser();
  }, []);

  const add = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Validation
    if (!textContent.trim()) {
      toast.error("Please fill in the text content");
      return;
    }

    if (!userId) {
      toast.error("User not authenticated");
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase.from("importedText").insert({
        user_id: userId,
        title: textTitle.trim() || "Untitled",
        content: textContent.trim(),
      });

      if (error) {
        console.error("Supabase error:", error);
        toast.error("Error saving text: " + error.message);
        return;
      }

      toast.success("Text saved successfully! ✅");

      // Reset form
      setTextTitle("");
      setTextContent("");
      setOpen(false);

      // Refresh the page or redirect
      router.refresh();
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("Unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="mx-4">
          Add Text
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={add}>
          <DialogHeader>
            <DialogTitle>Add Text</DialogTitle>
            <DialogDescription>
              Create and save a target text to learn from.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-3">
              <Label htmlFor="audience-name">Title</Label>
              <Input
                value={textTitle}
                onChange={(e) => setTextTitle(e.target.value)}
                id="audience-name"
                placeholder="Add a short title (optional)"
                disabled={loading}
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="target-description">
                Content <span className="text-red-500">*</span>
              </Label>
              <textarea
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                className="h-36 text-sm rounded-md border bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                id="target-description"
                placeholder="Type or paste your text"
                required
                disabled={loading}
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="cursor-pointer"
                disabled={loading}
              >
                Cancel
              </Button>
            </DialogClose>

            <Button
              type="submit"
              className="cursor-pointer hover:opacity-80"
              disabled={loading || !userId}
            >
              {loading ? (
                <>
                  <Loader className="h-4 w-4 animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Addtext;
