"use client";

import { Terminal, Search, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DashboardHeaderProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

export default function DashboardHeader({ searchQuery, setSearchQuery }: DashboardHeaderProps) {
  return (
    <header className="border-b border-terminal-border bg-card">
      <div className="container mx-auto px-4 lg:px-6 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <Terminal className="w-6 h-6 sm:w-8 sm:h-8 matrix-text animate-matrix-flicker" />
            <div>
              <h1 className="text-xl sm:text-2xl font-bold matrix-text font-mono">
                DIGITAL_LIBRARY
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground font-mono">
                &gt; Personal Knowledge Base
              </p>
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
              <Button variant="terminal" size="sm" className="flex-1 sm:flex-none text-xs sm:text-sm">
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
  );
}
