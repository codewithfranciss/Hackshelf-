"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Save, ChevronLeft, ChevronRight } from "lucide-react";
import RichTextEditor from "@/components/book-viewer/RichTextEditor";
import { useRouter } from "next/navigation";

const book = {
  id: "1",
  title: "Introduction to Algorithms",
  thumbnail: '/book-algorithms.jpg',
  lastPage: 45,
  totalPages: 1292,
  shelf: "DSA",
  description: "Comprehensive guide to algorithms and data structures"
};

interface Book {
  id: string;
  title: string;
  thumbnail: string;
  lastPage: number;
  totalPages: number;
  shelf: string;
  description?: string;
}

// Utility function to generate random dummy content
const generateDummyPage = (page: number) => {
  const texts = [
    "Knowledge is power. Each page brings you closer to wisdom.",
    "Technology is best when it brings people together.",
    "Mathematics is the language with which God has written the universe.",
    "History teaches us not only the past but how to shape the future.",
    "Fiction reveals truth that reality obscures.",
    "Learning never exhausts the mind.",
    "Books are a uniquely portable magic."
  ];
  const randomText = texts[Math.floor(Math.random() * texts.length)];
  return `Page ${page}: ${randomText}`;
};

export default function BookViewer() {
  const [currentPage, setCurrentPage] = useState(book.lastPage || 1);
  const [notes, setNotes] = useState("");
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const router = useRouter();

  // Auto-save notes every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (notes.trim()) {
        localStorage.setItem(`notes_${book.id}`, notes);
        setLastSaved(new Date());
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [notes]);

  // Load existing notes
  useEffect(() => {
    const savedNotes = localStorage.getItem(`notes_${book.id}`);
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  const handleSaveNotes = () => {
    localStorage.setItem(`notes_${book.id}`, notes);
    setLastSaved(new Date());
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= book.totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="min-h-screen bg-background p-2 md:p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 md:mb-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="text-foreground hover:bg-secondary flex-shrink-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="min-w-0">
            <h1 className="text-lg md:text-xl font-bold text-foreground truncate">{book.title}</h1>
            <p className="text-sm text-muted-foreground">
              Page {currentPage} of {book.totalPages}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
          <Button
            onClick={handleSaveNotes}
            variant="outline"
            size="sm"
            className="text-foreground border-border hover:bg-secondary"
          >
            <Save className="h-4 w-4 md:mr-2" />
            <span className="hidden md:inline">Save Notes</span>
          </Button>
          {lastSaved && (
            <span className="text-xs text-muted-foreground hidden md:inline">
              Saved {lastSaved.toLocaleTimeString()}
            </span>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 md:gap-6 h-[calc(100vh-6rem)] md:h-[calc(100vh-8rem)]">
        {/* PDF Viewer */}
        <div className="terminal-card p-2 md:p-4 h-[50vh] lg:h-full">
          <div className="h-full flex flex-col">
            {/* PDF Controls */}
            <div className="flex items-center justify-between mb-2 md:mb-4 p-2 bg-secondary/50 rounded">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                className="text-foreground border-border"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <span className="text-xs md:text-sm text-foreground">
                Page {currentPage} of {book.totalPages}
              </span>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= book.totalPages}
                className="text-foreground border-border"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            
            {/* PDF Content */}
            <div className="flex-1 bg-muted/30 rounded border border-border p-2 md:p-8 overflow-auto">
              <div className="bg-white text-black p-4 md:p-8 rounded shadow-lg max-w-2xl mx-auto">
                <h2 className="text-xl md:text-2xl font-bold mb-4">{book.title}</h2>
                <p className="text-base md:text-lg mb-4">Page {currentPage}</p>
                <div className="space-y-4 text-gray-800 text-sm md:text-base">
                  <p>{generateDummyPage(currentPage)}</p>
                  <p>
                    This is a dummy simulation of a PDF page. In real usage,
                    you'd render content from the actual PDF file.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notes Section */}
        <div className="terminal-card p-2 md:p-4 h-[50vh] lg:h-full">
          <div className="h-full flex flex-col">
            <div className="flex items-center gap-2 mb-2 md:mb-4">
              <FileText className="h-4 md:h-5 w-4 md:w-5 text-foreground" />
              <h2 className="text-base md:text-lg font-semibold text-foreground">Notes</h2>
            </div>
            
            <div className="flex-1 min-h-0">
              <RichTextEditor
                content={notes}
                onChange={setNotes}
                placeholder="Start taking notes..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
