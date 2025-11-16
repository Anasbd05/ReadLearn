"use client";
import { supabase } from "@/utils/supabase/client";
import { Crown } from "lucide-react";
import React, { useState, useEffect } from "react";

const Credits = () => {
  const [credits, setCredits] = useState<number | null>(null);

  useEffect(() => {
    const fetchCredits = async () => {
      // 1. Get the currently logged-in user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        console.error(userError);
        return;
      }

      if (!user) {
        console.log("No user logged in");
        return;
      }

      // 2. Fetch that user's credits
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id) // match with your "id" column (adjust if it's "user_id" or "email")
        .single();

      if (error) {
        console.error(error);
      } else {
        setCredits(data?.credits ?? 0);
      }
    };

    fetchCredits();
  }, []);

  return (
    <div className="py-1.5 px-4 mx-4 bg-gray-50 border  hover:opacity-80 flex items-center font-medium gap-2 text-black rounded-md">
      <span className=" flex items-center justify-center ">{credits}</span>
      <span>Credits</span>
    </div>
  );
};

export default Credits;
