/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import {
  Globe,
  Target,
  Save,
  Loader2,
  ArrowLeft,
  LogOut,
  Trash2,
} from "lucide-react";
import { supabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "zh", name: "Chinese" },
];

export default function SettingsPage() {
  const [userEmail, setUserEmail] = useState("");
  const [fluentLanguage, setFluentLanguage] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  // Load user data and settings
  useEffect(() => {
    async function loadUserData() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          router.push("/login");
          return;
        }

        setUserEmail(user.email || "");

        const { data: profile, error } = await supabase
          .from("users")
          .select("fluent_language, target_language")
          .eq("id", user.id)
          .single();

        if (error) throw error;

        if (profile) {
          setFluentLanguage(profile.fluent_language || "");
          setTargetLanguage(profile.target_language || "");
        }
      } catch (err) {
        console.error("Error loading user data:", err);
        setError("Failed to load your settings");
      } finally {
        setInitialLoading(false);
      }
    }

    loadUserData();
  }, [supabase, router]);

  const handleLanguageUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("No user found");

      if (fluentLanguage === targetLanguage) {
        throw new Error(
          "Your fluent language and target language cannot be the same"
        );
      }

      const { error: updateError } = await supabase
        .from("users")
        .update({
          fluent_language: fluentLanguage,
          target_language: targetLanguage,
        })
        .eq("id", user.id);

      if (updateError) throw updateError;

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to update language settings");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const handleDeleteAccount = async () => {
    {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) throw new Error("No user found");

        // Delete user data
        await supabase.from("users").delete().eq("id", user.id);

        // Sign out
        await supabase.auth.signOut();
        router.push("/");
      } catch (err) {
        console.error("Error deleting account:", err);
        setError("Failed to delete account");
      }
    }
  };

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
      </div>
    );
  }

  const getInitials = (email: string) => {
    if (email) return email.charAt(0).toUpperCase();
    return "U";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <h1 className="text-4xl font-bold text-gray-900">Settings</h1>
        </div>

        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-80 shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <button className="w-full px-6 py-4 text-left font-medium transition-colors bg-gray-900 text-white">
                General
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="space-y-6">
              {/* Profile Section */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Profile
                </h2>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-linear-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white text-lg font-bold shrink-0">
                    {getInitials(userEmail)}
                  </div>
                  <p className="text-gray-900 text-lg">{userEmail}</p>
                </div>
              </div>

              {/* Language Settings */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Languages
                </h2>

                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm">
                    Settings updated successfully!
                  </div>
                )}

                <form onSubmit={handleLanguageUpdate}>
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    {/* Fluent Language */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <Globe className="w-4 h-4 text-amber-600" />
                        Fluent Language
                      </label>
                      <Select
                        value={fluentLanguage}
                        onValueChange={(value) => setFluentLanguage(value)}
                        required
                      >
                        <SelectTrigger className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Fluent Language</SelectLabel>
                            {languages.map((lang) => (
                              <SelectItem key={lang.code} value={lang.code}>
                                {lang.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Target Language */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <Target className="w-4 h-4 text-amber-600" />
                        Learning Language
                      </label>
                      <Select
                        value={targetLanguage}
                        onValueChange={(value) => setTargetLanguage(value)}
                        required
                      >
                        <SelectTrigger className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Learning Language</SelectLabel>
                            {languages.map((lang) => (
                              <SelectItem key={lang.code} value={lang.code}>
                                {lang.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        Save Changes
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Actions */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                <div className="flex gap-4">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-6 py-2 hover:bg-red-100 text-red-600 rounded-md transition-all"
                  >
                    <LogOut className="size-5 text-destructive" />
                    Logout
                  </button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button className="flex items-center gap-2 px-6 py-2 hover:bg-red-600 border  hover:text-white rounded-md transition-all">
                        <Trash2 className="size-5" />
                        Delete
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your account and remove your data from our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteAccount}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
