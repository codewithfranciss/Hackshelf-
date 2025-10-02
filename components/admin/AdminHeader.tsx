"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function AdminHeader({ onBack }: { onBack: () => void }) {
  return (
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
  );
}
