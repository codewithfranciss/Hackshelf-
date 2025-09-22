"use client"

import { useState, cloneElement } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Terminal, BookOpen, Brain, Database, Code, LogOut, Plus, Search, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
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

   const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [selectedShelf, setSelectedShelf] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<'dashboard' | 'admin'>('dashboard');
  const [searchQuery, setSearchQuery] = useState("");



  const shelves = Array.from(new Set(books.map(book => book.shelf)));

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.shelf.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getShelfIcon = (shelfName: string) => {
    switch (shelfName) {
      case "DSA": return <Database className="w-5 h-5" />;
      case "Machine Learning": return <Brain className="w-5 h-5" />;
      case "Software Engineering": return <Code className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  const getProgress = (lastPage: number, totalPages: number) => {
    return Math.round((lastPage / totalPages) * 100);
  };


  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-terminal-border bg-card">
        <div className="container mx-auto px-4 lg:px-6 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <Terminal className="w-6 h-6 sm:w-8 sm:h-8 matrix-text animate-matrix-flicker" />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold matrix-text font-mono">DIGITAL_LIBRARY</h1>
                <p className="text-xs sm:text-sm text-muted-foreground font-mono">&gt; Personal Knowledge Base</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <div className="relative order-3 sm:order-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search books..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full sm:w-64 font-mono bg-code-bg border-terminal-border focus:border-matrix"
                />
              </div>
              <div className="flex gap-2 sm:gap-4 order-1 sm:order-2">
                <Button 
                  variant="terminal" 
                  size="sm" 
                
                  className="flex-1 sm:flex-none text-xs sm:text-sm"
                >
                  <Settings className="w-4 h-4" />
                  <span className="hidden sm:inline">ADMIN</span>
                  <span className="sm:hidden">ADM</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                
                  className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground flex-1 sm:flex-none text-xs sm:text-sm"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">LOGOUT</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 lg:px-6 py-8">
        <div className="space-y-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="terminal-card">
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 matrix-text" />
                  <div>
                    <p className="text-lg sm:text-2xl font-bold matrix-text">{books.length}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground font-mono">TOTAL_BOOKS</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="terminal-card">
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Database className="w-6 h-6 sm:w-8 sm:h-8 matrix-text" />
                  <div>
                    <p className="text-lg sm:text-2xl font-bold matrix-text">{shelves.length}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground font-mono">ACTIVE_SHELVES</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="terminal-card">
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Brain className="w-6 h-6 sm:w-8 sm:h-8 matrix-text" />
                  <div>
                    <p className="text-lg sm:text-2xl font-bold matrix-text">
                      {Math.round(books.reduce((acc, book) => acc + getProgress(book.lastPage, book.totalPages), 0) / books.length)}%
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground font-mono">AVG_PROGRESS</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="terminal-card">
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Terminal className="w-6 h-6 sm:w-8 sm:h-8 matrix-text" />
                  <div>
                    <p className="text-lg sm:text-2xl font-bold matrix-text">
                      {books.reduce((acc, book) => acc + book.lastPage, 0)}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground font-mono">PAGES_READ</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Navigation */}
          {selectedShelf && (
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setSelectedShelf(null)}
                className="font-mono"
              >
                ← BACK_TO_SHELVES
              </Button>
              <div className="flex items-center gap-3">
                {getShelfIcon(selectedShelf)}
                <h2 className="text-xl font-bold matrix-text font-mono tracking-wider">
                  {selectedShelf.toUpperCase().replace(/\s+/g, '_')}
                </h2>
              </div>
            </div>
          )}

          {/* Shelves View */}
          {!selectedShelf && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold matrix-text font-mono tracking-wider">YOUR_SHELVES</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {shelves.map(shelf => {
                  const shelfBooks = books.filter(book => book.shelf === shelf);
                  const totalProgress = Math.round(
                    shelfBooks.reduce((acc, book) => acc + getProgress(book.lastPage, book.totalPages), 0) / shelfBooks.length
                  );
                  
                  return (
                    <Card 
                      key={shelf} 
                      className="terminal-card cursor-pointer group"
                      onClick={() => setSelectedShelf(shelf)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-center mb-6">
                          <div className="w-16 h-16 rounded-lg bg-code-bg border border-terminal-border group-hover:border-matrix transition-colors flex items-center justify-center">
                            <div className="matrix-text">
                              {shelf === "DSA" && <Database className="w-8 h-8" />}
                              {shelf === "Machine Learning" && <Brain className="w-8 h-8" />}
                              {shelf === "Software Engineering" && <Code className="w-8 h-8" />}
                              {!["DSA", "Machine Learning", "Software Engineering"].includes(shelf) && <BookOpen className="w-8 h-8" />}
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-center space-y-3">
                          <h3 className="font-bold text-foreground group-hover:text-matrix transition-colors font-mono text-lg">
                            {shelf.toUpperCase().replace(/\s+/g, '_')}
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
          )}

          {/* Books View */}
          {selectedShelf && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {books.filter(book => book.shelf === selectedShelf && (
                  book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  book.shelf.toLowerCase().includes(searchQuery.toLowerCase())
                )).map(book => {
                  const progress = getProgress(book.lastPage, book.totalPages);
                  
                  return (
                    <Card 
                      key={book.id} 
                      className="terminal-card cursor-pointer group"
                     
                    >
                      <CardContent className="p-4">
                        <div className="aspect-[3/4] bg-code-bg rounded-lg mb-4 overflow-hidden border border-terminal-border group-hover:border-matrix transition-colors">
                          <img 
                            src={book.thumbnail} 
                            alt={book.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <h3 className="font-semibold text-foreground group-hover:text-matrix transition-colors font-mono text-sm">
                            {book.title}
                          </h3>
                          
                          <p className="text-xs text-muted-foreground font-mono line-clamp-2">
                            {book.description}
                          </p>
                          
                          <div className="flex items-center justify-between text-xs font-mono">
                            <span className="text-matrix">
                              Page {book.lastPage}/{book.totalPages}
                            </span>
                            <Badge 
                              variant={progress > 50 ? "default" : "secondary"}
                              className="text-xs"
                            >
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
          )}

          {/* No Results */}
          {selectedShelf && books.filter(book => 
            book.shelf === selectedShelf && (
              book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              book.shelf.toLowerCase().includes(searchQuery.toLowerCase())
            )
          ).length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 matrix-text mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium matrix-text font-mono">NO_BOOKS_FOUND</h3>
              <p className="text-muted-foreground font-mono mt-2">
                {searchQuery ? "Try adjusting your search query" : "This shelf is empty"}
              </p>
            </div>
          )}

          {!selectedShelf && shelves.length === 0 && (
            <div className="text-center py-12">
              <Database className="w-16 h-16 matrix-text mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium matrix-text font-mono">NO_SHELVES_FOUND</h3>
              <p className="text-muted-foreground font-mono mt-2">
                Add some books to create your first shelf
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );

}