"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, BookOpen, Upload } from "lucide-react";

interface BookFormProps {
  bookForm: any;
  setBookForm: (form: any) => void;
  categories: any[];
  handleAddBook: () => void;
}

export default function BookForm({
  bookForm,
  setBookForm,
  categories,
  handleAddBook,
}: BookFormProps) {
  return (
    <Card className="terminal-card">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Add Book
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Title */}
        <div>
          <Label htmlFor="book-title">Title *</Label>
          <Input
            id="book-title"
            value={bookForm.title}
            onChange={(e) => setBookForm({ ...bookForm, title: e.target.value })}
            placeholder="Book title"
            className="bg-input border-border"
          />
        </div>

        {/* Author */}
        <div>
          <Label htmlFor="book-author">Author *</Label>
          <Input
            id="book-author"
            value={bookForm.author}
            onChange={(e) => setBookForm({ ...bookForm, author: e.target.value })}
            placeholder="Author name"
            className="bg-input border-border"
          />
        </div>

        {/* Category */}
        <div>
          <Label htmlFor="book-category">Category *</Label>
          <Select
            value={bookForm.categoryId}
            onValueChange={(value: any) => setBookForm({ ...bookForm, categoryId: value })}
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

        {/* Total Pages */}
        <div>
          <Label htmlFor="book-pages">Total Pages *</Label>
          <Input
            id="book-pages"
            type="number"
            value={bookForm.totalPages}
            onChange={(e) => setBookForm({ ...bookForm, totalPages: e.target.value })}
            placeholder="Number of pages"
            className="bg-input border-border"
          />
        </div>

        {/* Thumbnail */}
        <div>
          <Label htmlFor="book-thumbnail">Thumbnail URL</Label>
          <Input
            id="book-thumbnail"
            value={bookForm.thumbnail}
            onChange={(e) => setBookForm({ ...bookForm, thumbnail: e.target.value })}
            placeholder="Book cover image URL"
            className="bg-input border-border"
          />
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="book-description">Description</Label>
          <Textarea
            id="book-description"
            value={bookForm.description}
            onChange={(e: any) => setBookForm({ ...bookForm, description: e.target.value })}
            placeholder="Book description"
            className="bg-input border-border"
            rows={3}
          />
        </div>

        {/* PDF Upload */}
        <div>
          <Label htmlFor="book-pdf">Upload PDF *</Label>
          <div className="flex items-center gap-2">
            <Input
              id="book-pdf"
              type="file"
              accept=".pdf"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                setBookForm({ ...bookForm, pdfFile: file });
              }}
              className="bg-input border-border"
            />
            <Upload className="h-5 w-5 text-muted-foreground" />
          </div>
          {bookForm.pdfFile && (
            <p className="text-sm text-primary mt-2 flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              {bookForm.pdfFile.name} (
              {(bookForm.pdfFile.size / 1024 / 1024).toFixed(2)} MB)
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button onClick={handleAddBook} className="w-full matrix-button">
          <Plus className="h-4 w-4 mr-2" />
          Add Book
        </Button>
      </CardContent>
    </Card>
  );
}
