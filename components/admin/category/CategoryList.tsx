"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CategoryList({ categories }: any) {
  return (
    <Card className="terminal-card">
      <CardHeader>
        <CardTitle className="text-foreground">Existing Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {categories.map((category: any) => (
            <div
              key={category.id}
              className="p-3 bg-secondary/50 rounded-lg border border-border"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-foreground">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
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
  );
}
