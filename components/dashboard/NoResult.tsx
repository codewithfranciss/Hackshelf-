"use client";

import { Database, BookOpen } from "lucide-react";

interface NoResultsProps {
  type: "shelves" | "books";
  searchQuery?: string;
}

export default function NoResults({ type, searchQuery }: NoResultsProps) {
  if (type === "books") {
    return (
      <div className="text-center py-12">
        <BookOpen className="w-16 h-16 matrix-text mx-auto mb-4 opacity-50" />
        <h3 className="text-lg font-medium matrix-text font-mono">NO_BOOKS_FOUND</h3>
        <p className="text-muted-foreground font-mono mt-2">
          {searchQuery ? "Try adjusting your search query" : "This shelf is empty"}
        </p>
      </div>
    );
  }

  return (
    <div className="text-center py-12">
      <Database className="w-16 h-16 matrix-text mx-auto mb-4 opacity-50" />
      <h3 className="text-lg font-medium matrix-text font-mono">NO_SHELVES_FOUND</h3>
      <p className="text-muted-foreground font-mono mt-2">Add some books to create your first shelf</p>
    </div>
  );
}
