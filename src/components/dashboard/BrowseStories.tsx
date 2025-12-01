import React from "react";
import { ScrollText } from "lucide-react";

const BrowseStories = () => {
  return (
    <div className="w-full min-h-screen bg-muted/50 rounded-xl p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <ScrollText className="w-6 h-6 text-primary" />
            Browse Life Stories
          </h1>
          <p className="text-gray-600">
            Discover inspiring stories and improve your language skills
          </p>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center py-20">
          <div className="relative mb-8">
            {/* Decorative circles */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-200 rounded-full opacity-30 animate-pulse"></div>
            <div
              className="absolute -bottom-4 -right-4 w-32 h-32 bg-secondary/50 rounded-full opacity-30 animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>

            {/* Main icon */}
            <div className="relative bg-linear-to-br from-primary to-accent p-8 rounded-3xl shadow-2xl">
              <ScrollText className="w-24 h-24 text-white" strokeWidth={1.5} />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            No Stories Yet
          </h2>

          <p className="text-gray-600 text-center max-w-md mb-8 text-lg">
            We&#39;re working on bringing you amazing life stories to help you
            learn and grow. Check back soon!
          </p>

          {/* Coming Soon Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-secondary  text-white rounded-full font-semibold shadow-lg">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            Coming Soon
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseStories;
