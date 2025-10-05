"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Category {
  id: string | number;
  name: string;
  description?: string;
  bookCount?: number;
}

interface Book {
  id: string | number;
  title: string;
  author: string;
  categoryId: string | number;
  totalPages: number;
  thumbnail: string;
  description?: string;
  pdfFile?: File | null;
}
interface BookListProps {
  books: any[];
  categories: any[];
}

export default function BookList({ books, categories }: BookListProps) {
  return (
    <Card className="terminal-card">
      <CardHeader>
        <CardTitle className="text-foreground">Added Books</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {books.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              No books added yet
            </p>
          ) : (
            books.map((book) => (
              <div
                key={book.id}
                className="p-3 bg-secondary/50 rounded-lg border border-border"
              >
                <div className="flex gap-3">
                  <img
                    src={book.thumbnail}
                    alt={book.title}
                    className="w-12 h-16 object-cover rounded bg-muted"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">{book.title}</h3>
                    <p className="text-sm text-muted-foreground">by {book.author}</p>
                    <p className="text-xs text-muted-foreground">
                      {categories.find((c) => c.id === book.categoryId)?.name} •{" "}
                      {book.totalPages} pages
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
