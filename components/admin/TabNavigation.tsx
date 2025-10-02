"use client";
import { Button } from "@/components/ui/button";
import { FolderPlus, BookOpen } from "lucide-react";

export default function TabNavigation({
  activeTab,
  setActiveTab,
}: {
  activeTab: "categories" | "books";
  setActiveTab: (tab: "categories" | "books") => void;
}) {
  return (
    <div className="flex gap-2 mb-6">
      <Button
        variant={activeTab === "categories" ? "default" : "outline"}
        onClick={() => setActiveTab("categories")}
        className="flex items-center gap-2"
      >
        <FolderPlus className="h-4 w-4" />
        Categories
      </Button>
      <Button
        variant={activeTab === "books" ? "default" : "outline"}
        onClick={() => setActiveTab("books")}
        className="flex items-center gap-2"
      >
        <BookOpen className="h-4 w-4" />
        Books
      </Button>
    </div>
  );
}
