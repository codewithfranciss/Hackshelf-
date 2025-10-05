"use client";
import { useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import TabNavigation from "@/components/admin/TabNavigation";
import CategoryForm from "@/components/admin/category/CategoryForm";
import CategoryList from "@/components/admin/category/CategoryList";
import BookForm from "@/components/admin/create-books/BookForm";
import BookList from "@/components/dashboard/BookList";
import { createCategory } from "../service/category";

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
const handleCreateCategory = async () => {
  setError(null);
  if (!categoryForm.name.trim()) {
    setError("Category name is required");
    return;
  }
  try {
    const newCategory = await createCategory(categoryForm);
    // Update frontend state
    setCategories((prev) => [
      ...prev,
      {
        id: newCategory.id,
        name: newCategory.name,
        description: newCategory.description || "",
        bookCount: 0,
      },
    ]);
    setCategoryForm({ name: "", description: "" });
  } catch (error: any) {
    setError(error.message);
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
