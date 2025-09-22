"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Database, Brain, Code, BookOpen } from "lucide-react";

interface ShelfListProps {
  shelves: string[];
  books: any[];
  onSelectShelf: (shelf: string) => void;
  getProgress: (lastPage: number, totalPages: number) => number;
}

export default function ShelfList({ shelves, books, onSelectShelf, getProgress }: ShelfListProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold matrix-text font-mono tracking-wider">YOUR_SHELVES</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {shelves.map((shelf) => {
          const shelfBooks = books.filter((book) => book.shelf === shelf);
          const totalProgress = Math.round(
            shelfBooks.reduce((acc, book) => acc + getProgress(book.lastPage, book.totalPages), 0) /
              shelfBooks.length
          );

          return (
            <Card
              key={shelf}
              className="terminal-card cursor-pointer group"
              onClick={() => onSelectShelf(shelf)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 rounded-lg bg-code-bg border border-terminal-border group-hover:border-matrix transition-colors flex items-center justify-center">
                    <div className="matrix-text">
                      {shelf === "DSA" && <Database className="w-8 h-8" />}
                      {shelf === "Machine Learning" && <Brain className="w-8 h-8" />}
                      {shelf === "Software Engineering" && <Code className="w-8 h-8" />}
                      {!["DSA", "Machine Learning", "Software Engineering"].includes(shelf) && (
                        <BookOpen className="w-8 h-8" />
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-center space-y-3">
                  <h3 className="font-bold text-foreground group-hover:text-matrix transition-colors font-mono text-lg">
                    {shelf.toUpperCase().replace(/\s+/g, "_")}
                  </h3>

                  <div className="flex items-center justify-center gap-4 text-sm font-mono">
                    <div className="text-center">
                      <p className="text-matrix font-bold">{shelfBooks.length}</p>
                      <p className="text-muted-foreground text-xs">BOOKS</p>
                    </div>
                    <div className="text-center">
                      <p className="text-matrix font-bold">{totalProgress}%</p>
                      <p className="text-muted-foreground text-xs">PROGRESS</p>
                    </div>
                  </div>

                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-gradient-matrix h-2 rounded-full transition-all duration-300"
                      style={{ width: `${totalProgress}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
