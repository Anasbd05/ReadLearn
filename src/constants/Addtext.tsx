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
import { useState } from "react";
const Addtext = () => {
  const [textTitle, setTextTitle] = useState("");
  const [textContent, setTextContent] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const add = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { error } = await supabase.from("importedText").insert({
        textTitle: textTitle,
        textContent: textContent,
      });

      if (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTextTitle("");
      setTextContent("");
      setLoading(false);
      router.push("/custom-text");
    }
  };

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" className="mx-4">
            Add Text
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Text</DialogTitle>
            <DialogDescription>
              Create and save a target text to learn from .
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="audience-name">Title</Label>
              <Input
                value={textTitle}
                onChange={(e) => setTextTitle(e.target.value)}
                id="audience-name"
                name="name"
                placeholder="Add a short title"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="target-description">Content</Label>
              <textarea
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                className="h-36 text-sm rounded-md border bg-transparent px-3 py-1"
                id="target-description"
                name="description"
                placeholder="Type or paste the text in your target language"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="cursor-pointer">
                Cancel
              </Button>
            </DialogClose>
            <Button onClick={add} className="cursor-pointer hover:opacity-80">
              {loading ? <Loader className="h-4 w-4 animate-spin" /> : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default Addtext;
