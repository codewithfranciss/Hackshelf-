import { Terminal, BookOpen } from "lucide-react";

export default function Header() {
  return (
    <div className="text-center space-y-4">
      <div className="flex justify-center">
        <div className="relative">
          <Terminal className="w-16 h-16 matrix-text animate-matrix-flicker" />
          <BookOpen className="w-8 h-8 matrix-text absolute -bottom-1 -right-1" />
        </div>
      </div>
      <h1 className="text-4xl font-bold matrix-text tracking-wider">
        DOZIE&apos;S LIBRARY
      </h1>
      <p className="text-muted-foreground font-mono">&gt; Secure Access Required</p>
    </div>
  );
}
