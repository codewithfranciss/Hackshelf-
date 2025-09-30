import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Plus, BookOpen, FolderPlus, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Category {
  id: string;
  name: string;
  description: string;
  bookCount: number;
}

interface Book {
  id: string;
  title: string;
  author: string;
  categoryId: string;
  totalPages: number;
  thumbnail: string;
  description: string;
}

interface AdminPageProps {
  onBack: () => void;
}
export default function AdminPage({ onBack }: AdminPageProps) {
  const { toast } = useToast();
  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'DSA', description: 'Data Structures and Algorithms', bookCount: 2 },
    { id: '2', name: 'Machine Learning', description: 'ML and AI resources', bookCount: 1 },
    { id: '3', name: 'System Design', description: 'System architecture and design', bookCount: 1 },
  ]);

  const [books, setBooks] = useState<Book[]>([]);
  const [activeTab, setActiveTab] = useState<'categories' | 'books'>('categories');

  // Category form state
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    description: ''
  });

  // Book form state
  const [bookForm, setBookForm] = useState({
    title: '',
    author: '',
    categoryId: '',
    totalPages: '',
    thumbnail: '',
    description: '',
    pdfFile: null as File | null
  });

  const handleCreateCategory = () => {
    if (!categoryForm.name) {
      toast({
        title: "Error",
        description: "Category name is required",
        variant: "destructive"
      });
      return;
    }

    const newCategory: Category = {
      id: Date.now().toString(),
      name: categoryForm.name,
      description: categoryForm.description,
      bookCount: 0
    };

    setCategories([...categories, newCategory]);
    setCategoryForm({ name: '', description: '' });
    
    toast({
      title: "Success",
      description: "Category created successfully"
    });
  };

  const handleAddBook = () => {
    if (!bookForm.title || !bookForm.author || !bookForm.categoryId || !bookForm.totalPages) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const newBook: Book = {
      id: Date.now().toString(),
      title: bookForm.title,
      author: bookForm.author,
      categoryId: bookForm.categoryId,
      totalPages: parseInt(bookForm.totalPages),
      thumbnail: bookForm.thumbnail || '/placeholder.svg',
      description: bookForm.description
    };

    setBooks([...books, newBook]);
    
    // Update category book count
    setCategories(categories.map(cat => 
      cat.id === bookForm.categoryId 
        ? { ...cat, bookCount: cat.bookCount + 1 }
        : cat
    ));

    setBookForm({
      title: '',
      author: '',
      categoryId: '',
      totalPages: '',
      thumbnail: '',
      description: '',
      pdfFile: null
    });

    toast({
      title: "Success",
      description: "Book added successfully"
    });
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="text-foreground hover:bg-secondary"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6">
        <Button
          variant={activeTab === 'categories' ? 'default' : 'outline'}
          onClick={() => setActiveTab('categories')}
          className="flex items-center gap-2"
        >
          <FolderPlus className="h-4 w-4" />
          Categories
        </Button>
        <Button
          variant={activeTab === 'books' ? 'default' : 'outline'}
          onClick={() => setActiveTab('books')}
          className="flex items-center gap-2"
        >
          <BookOpen className="h-4 w-4" />
          Books
        </Button>
      </div>

      {/* Categories Tab */}
      {activeTab === 'categories' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Create Category Form */}
          <Card className="terminal-card">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <FolderPlus className="h-5 w-5" />
                Create Category
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="category-name">Category Name *</Label>
                <Input
                  id="category-name"
                  value={categoryForm.name}
                  onChange={(e) => setCategoryForm({...categoryForm, name: e.target.value})}
                  placeholder="e.g., Data Structures"
                  className="bg-input border-border"
                />
              </div>
              <div>
                <Label htmlFor="category-description">Description</Label>
                <Textarea
                  id="category-description"
                  value={categoryForm.description}
                  onChange={(e) => setCategoryForm({...categoryForm, description: e.target.value})}
                  placeholder="Brief description of the category"
                  className="bg-input border-border"
                  rows={3}
                />
              </div>
              <Button
                onClick={handleCreateCategory}
                className="w-full matrix-button"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Category
              </Button>
            </CardContent>
          </Card>

          {/* Existing Categories */}
          <Card className="terminal-card">
            <CardHeader>
              <CardTitle className="text-foreground">Existing Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="p-3 bg-secondary/50 rounded-lg border border-border"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-foreground">{category.name}</h3>
                        <p className="text-sm text-muted-foreground">{category.description}</p>
                      </div>
                      <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                        {category.bookCount} books
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Books Tab */}
      {activeTab === 'books' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Add Book Form */}
          <Card className="terminal-card">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Add Book
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="book-title">Title *</Label>
                <Input
                  id="book-title"
                  value={bookForm.title}
                  onChange={(e) => setBookForm({...bookForm, title: e.target.value})}
                  placeholder="Book title"
                  className="bg-input border-border"
                />
              </div>
              <div>
                <Label htmlFor="book-author">Author *</Label>
                <Input
                  id="book-author"
                  value={bookForm.author}
                  onChange={(e) => setBookForm({...bookForm, author: e.target.value})}
                  placeholder="Author name"
                  className="bg-input border-border"
                />
              </div>
              <div>
                <Label htmlFor="book-category">Category *</Label>
                <Select
                  value={bookForm.categoryId}
                  onValueChange={(value) => setBookForm({...bookForm, categoryId: value})}
                >
                  <SelectTrigger className="bg-input border-border">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                     ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="book-pages">Total Pages *</Label>
                <Input
                  id="book-pages"
                  type="number"
                  value={bookForm.totalPages}
                  onChange={(e) => setBookForm({...bookForm, totalPages: e.target.value})}
                  placeholder="Number of pages"
                  className="bg-input border-border"
                />
              </div>
              <div>
                <Label htmlFor="book-thumbnail">Thumbnail URL</Label>
                <Input
                  id="book-thumbnail"
                  value={bookForm.thumbnail}
                  onChange={(e) => setBookForm({...bookForm, thumbnail: e.target.value})}
                  placeholder="Book cover image URL"
                  className="bg-input border-border"
                />
              </div>
              <div>
                <Label htmlFor="book-description">Description</Label>
                <Textarea
                  id="book-description"
                  value={bookForm.description}
                  onChange={(e) => setBookForm({...bookForm, description: e.target.value})}
                  placeholder="Book description"
                  className="bg-input border-border"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="book-pdf">Upload PDF *</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="book-pdf"
                    type="file"
                    accept=".pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setBookForm({...bookForm, pdfFile: file});
                    }}
                    className="bg-input border-border"
                  />
                  <Upload className="h-5 w-5 text-muted-foreground" />
                </div>
                {bookForm.pdfFile && (
                  <p className="text-sm text-primary mt-2 flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    {bookForm.pdfFile.name} ({(bookForm.pdfFile.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                )}
              </div>
              <Button
                onClick={handleAddBook}
                className="w-full matrix-button"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Book
              </Button>
            </CardContent>
          </Card>

          {/* Added Books */}
          <Card className="terminal-card">
            <CardHeader>
              <CardTitle className="text-foreground">Added Books</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {books.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">No books added yet</p>
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
                              {categories.find(c => c.id === book.categoryId)?.name} • {book.totalPages} pages
                            </p>
                          </div>
                        </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

