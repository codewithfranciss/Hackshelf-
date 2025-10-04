"use client";
import { useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import TabNavigation from "@/components/admin/TabNavigation";
import CategoryForm from "@/components/admin/category/CategoryForm";
import CategoryList from "@/components/admin/category/CategoryList";
import BookForm from "@/components/admin/create-books/BookForm";
import BookList from "@/components/dashboard/BookList";
import { Upload } from 'lucide-react';

export default function AdminPage({ onBack }: { onBack: () => void }) {
  const [categories, setCategories] = useState<any[]>([]);
  const [books, setBooks] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"categories" | "books">("categories");
  const [error, setError] = useState<string | null>(null);

  // Forms
  const [categoryForm, setCategoryForm] = useState({ name: "", description: "" });
  const [bookForm, setBookForm] = useState({
    title: "",
    author: "",
    categoryId: "",
    totalPages: "",
    thumbnail: "",
    description: "",
    pdfFile: null as File | null,
  });

  // Add category
// Add category
const handleCreateCategory = async () => {
  setError(null); // reset any previous error

  if (!categoryForm.name.trim()) {
    setError("Category name is required");
    return;
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(categoryForm),
    });

    const data = await res.json();

    if (!res.ok) {
      // Handle server-side errors
      setError(data.message || "Failed to create category");
      return;
    }
      // Update local state with new category
    setCategories((prev) => [
      ...prev,
      {
        id: data.id, // real DB ID from NestJS/Prisma
        name: data.name,
        description: data.description || "",
        bookCount: 0,
      },
    ]);

    // Reset form after success
    setCategoryForm({ name: "", description: "" });
  } catch (err) {
    console.error(err);
    setError("Network error. Please try again.");
  }
};


  // Add book
  const handleAddBook = () => {
    if (!bookForm.title || !bookForm.author || !bookForm.categoryId || !bookForm.totalPages) return;
    const newBook = {
      id: Date.now().toString(),
      ...bookForm,
      totalPages: parseInt(bookForm.totalPages),
      thumbnail: bookForm.thumbnail || "/placeholder.svg",
    };
    setBooks([...books, newBook]);
    setCategories(
      categories.map((cat) =>
        cat.id === bookForm.categoryId ? { ...cat, bookCount: cat.bookCount + 1 } : cat
      )
    );
    setBookForm({
      title: "",
      author: "",
      categoryId: "",
      totalPages: "",
      thumbnail: "",
      description: "",
      pdfFile: null,
    });
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <AdminHeader onBack={onBack} />
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "categories" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CategoryForm
            categoryForm={categoryForm}
            setCategoryForm={setCategoryForm}
            handleCreateCategory={handleCreateCategory}
          />
          <CategoryList categories={categories} />
        </div>
      )}

      {activeTab === "books" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BookForm
            bookForm={bookForm}
            setBookForm={setBookForm}
            categories={categories}
            handleAddBook={handleAddBook}
          />
          <BookList books={books} categories={categories} />
        </div>
      )}
    </div>
  );
}
