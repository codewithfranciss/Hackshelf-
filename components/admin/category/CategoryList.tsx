"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAllCategories } from "@/app/service /category";
import { Edit, Trash2 } from "lucide-react";

export default function CategoryList() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch categories");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Handle delete
  const handleDelete = async (id: number) => {

  };

  // Handle edit (for now just log or open a modal)
  const handleEdit = (category: any) => {
    console.log("Editing:", category);
    // Later: open a dialog/modal with the form prefilled for editing
  };

  if (loading) {
    return (
      <Card className="terminal-card">
        <CardHeader>
          <CardTitle>Loading categories...</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="terminal-card">
        <CardHeader>
          <CardTitle className="text-red-500">{error}</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="border border-border shadow-sm">
      <CardHeader>
        <CardTitle className="text-foreground text-lg font-semibold">
          Existing Categories
        </CardTitle>
      </CardHeader>

      <CardContent>
        {categories.length === 0 ? (
          <p className="text-muted-foreground text-sm">No categories yet.</p>
        ) : (
          <div className="space-y-3">
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex justify-between items-center p-4 bg-secondary/30 rounded-xl border border-border hover:bg-secondary/40 transition-all"
              >
                <div>
                  <h3 className="font-medium text-foreground text-base">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {category.description || "No description"}
                  </p>
                  <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded mt-2 inline-block">
                    {category.books?.length ?? 0} books
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEdit(category)}
                    className="hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    <Edit size={16} />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDelete(category.id)}
                    className="hover:bg-red-50 hover:text-red-600 transition-colors"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
