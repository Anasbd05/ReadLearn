import React from "react";
import { allArticles } from "@/assets/articles/assets";
import ArticlePageClient from "@/components/dashboard/ArticlePageClient";

interface PageProps {
  params: Promise<{ title: string }>;
}

const ArticlePage = async ({ params }: PageProps) => {
  const resolvedParams = await params;
  const { title } = resolvedParams;
  const decodedTitle = decodeURIComponent(title);

  const article = allArticles.find(
    (a) => a.title.toLowerCase() === decodedTitle.toLowerCase()
  );

  if (!article) {
    return <div className="p-8 text-center">Article not found</div>;
  }

  return <ArticlePageClient article={JSON.parse(JSON.stringify(article))} />;
};

export default ArticlePage;
