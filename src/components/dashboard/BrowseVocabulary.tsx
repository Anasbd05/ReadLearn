import React from "react";
import { Trash2, BookOpen, Languages } from "lucide-react";

export default function BrowseVocabulary() {
  const savedwords = [
    {
      id: 1,
      originalWord: "Courage",
      translation: "شجاعة",
    },
    {
      id: 2,
      originalWord: "Journey",
      translation: "رحلة",
    },
    {
      id: 3,
      originalWord: "Wisdom",
      translation: "حكمة",
    },
    {
      id: 4,
      originalWord: "Dream",
      translation: "حلم",
    },
    {
      id: 5,
      originalWord: "Treasure",
      translation: "كنز",
    },
    {
      id: 6,
      originalWord: "Adventure",
      translation: "مغامرة",
    },
    {
      id: 7,
      originalWord: "Hope",
      translation: "أمل",
    },
    {
      id: 8,
      originalWord: "Freedom",
      translation: "حرية",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-muted/50 rounded-xl p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header - Compact */}
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Languages className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                Saved Vocabulary
              </h1>
              <p className="text-xs text-gray-600">English → Arabic</p>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {savedwords.length === 0 && (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-lg font-bold text-gray-800 mb-2">
                No saved words yet
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Start reading and click on any word in your books to save it
                here with its translation.
              </p>
              <div className="bg-blue-50 border-2 border-dashed border-blue-200 rounded-lg p-4">
                <p className="text-xs text-blue-800 font-medium mb-1">
                  💡 How it works:
                </p>
                <p className="text-xs text-blue-700">
                  While reading, simply click on any word to save it with its
                  Arabic translation.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Filled State */}
        {savedwords.length > 0 && (
          <>
            {/* Stats Bar - Compact */}
            <div className="bg-white rounded-lg shadow-sm p-3 mb-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-800">
                    {savedwords.length}
                  </span>{" "}
                  words
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <span className="font-medium">EN</span>
                  <Languages className="w-3 h-3" />
                  <span className="font-medium">AR</span>
                </div>
              </div>
            </div>

            {/* Grid Layout for Compact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {savedwords.map((word) => (
                <div
                  key={word.id}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all p-4 border border-gray-100 group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      {/* English Word */}
                      <div className="mb-2">
                        <h3 className="text-lg font-bold text-gray-800 truncate">
                          {word.originalWord}
                        </h3>
                        <p className="text-xs text-gray-400">English</p>
                      </div>

                      {/* Arrow */}
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-px bg-gray-200 flex-1"></div>
                        <span className="text-gray-300 text-sm">→</span>
                        <div className="h-px bg-gray-200 flex-1"></div>
                      </div>

                      {/* Arabic Translation */}
                      <div>
                        <h3
                          className="text-lg font-bold text-blue-600 truncate"
                          dir="rtl"
                        >
                          {word.translation}
                        </h3>
                        <p className="text-xs text-gray-400">Arabic</p>
                      </div>
                    </div>

                    {/* Delete Button */}
                    <button
                      className="ml-2 p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors opacity-0 group-hover:opacity-100"
                      title="Remove word"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
