"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, FolderPlus } from "lucide-react";

export default function CategoryForm({ categoryForm, setCategoryForm, handleCreateCategory }: any) {
  return (
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
            onChange={(e) =>
              setCategoryForm({ ...categoryForm, name: e.target.value })
            }
            placeholder="e.g., Data Structures"
            className="bg-input border-border"
          />
        </div>
        <div>
          <Label htmlFor="category-description">Description</Label>
          <Textarea
            id="category-description"
            value={categoryForm.description}
            onChange={(e: any) =>
              setCategoryForm({ ...categoryForm, description: e.target.value })
            }
            placeholder="Brief description of the category"
            className="bg-input border-border"
            rows={3}
          />
        </div>
        <Button onClick={handleCreateCategory} className="w-full matrix-button">
          <Plus className="h-4 w-4 mr-2" />
          Create Category
        </Button>
      </CardContent>
    </Card>
  );
}
