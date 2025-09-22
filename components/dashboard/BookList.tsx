"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Book {
  id: string;
  title: string;
  thumbnail: string;
  lastPage: number;
  totalPages: number;
  shelf: string;
  description?: string;
}

interface BookListProps {
  books: Book[];
  selectedShelf: string;
  searchQuery: string;
  getProgress: (lastPage: number, totalPages: number) => number;
}

export default function BookList({ books, selectedShelf, searchQuery, getProgress }: BookListProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books
          .filter(
            (book) =>
              book.shelf === selectedShelf &&
              (book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                book.shelf.toLowerCase().includes(searchQuery.toLowerCase()))
          )
          .map((book) => {
            const progress = getProgress(book.lastPage, book.totalPages);

            return (
              <Card key={book.id} className="terminal-card cursor-pointer group">
                <CardContent className="p-4">
                  <div className="aspect-[3/4] bg-code-bg rounded-lg mb-4 overflow-hidden border border-terminal-border group-hover:border-matrix transition-colors">
                    <img src={book.thumbnail} alt={book.title} className="w-full h-full object-cover" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold text-foreground group-hover:text-matrix transition-colors font-mono text-sm">
                      {book.title}
                    </h3>

                    <p className="text-xs text-muted-foreground font-mono line-clamp-2">{book.description}</p>

                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-matrix">
                        Page {book.lastPage}/{book.totalPages}
                      </span>
                      <Badge variant={progress > 50 ? "default" : "secondary"} className="text-xs">
                        {progress}%
                      </Badge>
                    </div>

                    <div className="w-full bg-secondary rounded-full h-1.5">
                      <div
                        className="bg-gradient-matrix h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
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
