"use client";

import { useState } from "react";
import DashboardHeader from "@/components/dashboard/Header";
import StatsOverview from "@/components/dashboard/StatsOverview";
import ShelfList from "@/components/dashboard/ShelfList";
import BookList from "@/components/dashboard/BookList";
import NoResults from "@/components/dashboard/NoResult";
import { Button } from "@/components/ui/button";
import { books } from "@/constants/dummy";


interface Book {
  id: string;
  title: string;
  thumbnail: string;
  lastPage: number;
  totalPages: number;
  shelf: string;
  description?: string;
}

export default function DashboardPage() {
  const [selectedShelf, setSelectedShelf] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const shelves = Array.from(new Set(books.map((book) => book.shelf)));

  const getProgress = (lastPage: number, totalPages: number) => {
    return Math.round((lastPage / totalPages) * 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <main className="container mx-auto px-4 lg:px-6 py-8">
        <div className="space-y-8">
          {/* Stats */}
          <StatsOverview
            totalBooks={books.length}
            totalShelves={shelves.length}
            avgProgress={Math.round(
              books.reduce((acc, book) => acc + getProgress(book.lastPage, book.totalPages), 0) / books.length
            )}
            pagesRead={books.reduce((acc, book) => acc + book.lastPage, 0)}
          />

          {/* Back button + Shelf Title */}
          {selectedShelf && (
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={() => setSelectedShelf(null)} className="font-mono">
                ← BACK_TO_SHELVES
              </Button>
              <div className="flex items-center gap-3">
                
                <h2 className="text-xl font-bold matrix-text font-mono tracking-wider">
                  {selectedShelf.toUpperCase().replace(/\s+/g, "_")}
                </h2>
              </div>
            </div>
          )}

          {/* Shelves */}
          {!selectedShelf && shelves.length > 0 && (
            <ShelfList shelves={shelves} books={books} onSelectShelf={setSelectedShelf} getProgress={getProgress} />
          )}

          {/* Books */}
          {selectedShelf && (
            <BookList
              books={books}
              selectedShelf={selectedShelf}
              searchQuery={searchQuery}
              getProgress={getProgress}
            />
          )}

          {/* No Results */}
          {selectedShelf &&
            books.filter(
              (book) =>
                book.shelf === selectedShelf &&
                (book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  book.shelf.toLowerCase().includes(searchQuery.toLowerCase()))
            ).length === 0 && <NoResults type="books" searchQuery={searchQuery} />}

          {!selectedShelf && shelves.length === 0 && <NoResults type="shelves" />}
        </div>
      </main>
    </div>
  );


}
