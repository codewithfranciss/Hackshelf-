'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Terminal, Lock, BookOpen } from "lucide-react";

interface LoginPageProps {
  onLogin: () => void;
}

export default function LoginPage ({ onLogin }: LoginPageProps){
  const [password, setPassword] = useState("");
  const [showRequestAccess, setShowRequestAccess] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = () => {

    if (password.trim()) {
      onLogin();
    }
  };

  const handleRequestAccess = () => {
   
    alert("Access request submitted. You'll hear back soon.");
    setShowRequestAccess(false);
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="relative">
              <Terminal className="w-16 h-16 matrix-text animate-matrix-flicker" />
              <BookOpen className="w-8 h-8 matrix-text absolute -bottom-1 -right-1" />
            </div>
          </div>
          <h1 className="text-4xl font-bold matrix-text tracking-wider">
            DIGITAL LIBRARY
          </h1>
          <p className="text-muted-foreground font-mono">
            &gt; Secure Access Required
          </p>
        </div>

        {/* Login Card */}
        <Card className="terminal-card">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl matrix-text font-mono">
              {showRequestAccess ? "REQUEST_ACCESS" : "AUTHENTICATE"}
            </CardTitle>
            <p className="text-sm text-muted-foreground font-mono">
              {showRequestAccess 
                ? "> Enter your credentials to request library access"
                : "> Enter password to access your personal library"
              }
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {showRequestAccess ? (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-mono matrix-text">EMAIL_ADDRESS</label>
                  <Input
                    type="email"
                    placeholder="user@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="font-mono bg-code-bg border-terminal-border focus:border-matrix focus:ring-matrix"
                  />
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={handleRequestAccess}
                    variant="hack"
                    className="flex-1"
                    disabled={!email.trim()}
                  >
                    <Lock className="w-4 h-4" />
                    SUBMIT_REQUEST
                  </Button>
                  <Button 
                    onClick={() => setShowRequestAccess(false)}
                    variant="terminal"
                  >
                    BACK
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-mono matrix-text">PASSWORD</label>
                  <Input
                    type="password"
                    placeholder="Enter access code..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                    className="font-mono bg-code-bg border-terminal-border focus:border-matrix focus:ring-matrix"
                  />
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={handleLogin}
                    variant="hack"
                    className="flex-1"
                    disabled={!password.trim()}
                  >
                    <Terminal className="w-4 h-4" />
                    ENTER_SYSTEM
                  </Button>
                  <Button 
                    onClick={() => setShowRequestAccess(true)}
                    variant="terminal"
                  >
                    REQUEST_ACCESS
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground font-mono">
          <p>&gt; Unauthorized access prohibited</p>
          <p>&gt; All access attempts are logged</p>
        </div>
      </div>
    </div>
  );
};

