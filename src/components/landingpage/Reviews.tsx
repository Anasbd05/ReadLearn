import React from "react";
import { Star } from "lucide-react";
import { reviews } from "@/assets/assets";

const Reviews = () => {
  const highlightText = (text: string, highlight: string) => {
    if (!highlight) return text;
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={i} className="bg-amber-100 px-1">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div id="reviews" className="bg-white px-4 sm:px-6 lg:px-8 py-20">
      {/* Header */}
      <div className="text-center space-y-4 mb-16">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
          Loved by Language Learners Worldwide
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Join thousands who are mastering languages through reading
        </p>
      </div>

      {/* Reviews Masonry Grid */}
      <div className="columns-1 md:columns-2 lg:columns-4 gap-4 space-y-4">
        {reviews.map((review, index) => (
          <div
            key={`${review.name}-${index}`}
            className="break-inside-avoid bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all inline-block w-full"
          >
            {/* Rating */}
            <div className="flex gap-1 mb-4">
              {[...Array(review.rating)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-amber-400 text-amber-400"
                />
              ))}
            </div>

            {/* Review Text */}
            <p className="text-gray-700 leading-relaxed mb-6 text-sm">
              {highlightText(review.text, review.highlight)}
            </p>

            {/* Author Info */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex bg-secondary items-center justify-center text-white font-bold text-sm shrink-0">
                {review.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-gray-900 text-sm truncate">
                  {review.name}
                </h4>
                <p className="text-xs text-gray-600 truncate">{review.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
