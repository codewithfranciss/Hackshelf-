"use client";

import { BookOpen, Database, Brain, Terminal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatsOverviewProps {
  totalBooks: number;
  totalShelves: number;
  avgProgress: number;
  pagesRead: number;
}

export default function StatsOverview({ totalBooks, totalShelves, avgProgress, pagesRead }: StatsOverviewProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card className="terminal-card">
        <CardContent className="p-3 sm:p-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 matrix-text" />
            <div>
              <p className="text-lg sm:text-2xl font-bold matrix-text">{totalBooks}</p>
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
              <p className="text-lg sm:text-2xl font-bold matrix-text">{totalShelves}</p>
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
              <p className="text-lg sm:text-2xl font-bold matrix-text">{avgProgress}%</p>
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
              <p className="text-lg sm:text-2xl font-bold matrix-text">{pagesRead}</p>
              <p className="text-xs sm:text-sm text-muted-foreground font-mono">PAGES_READ</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
