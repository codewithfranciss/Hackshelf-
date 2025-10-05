'use client';

import { Auth } from '@/app/service/auth';
import Header from '@/components/shared /Header';
import Footer from '@/components/shared /Footer';
import RequestAccessForm from '../RequestAccess';
import PasswordForm from '../PasswordForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';



export default function LoginPage() {
  const {
    password,
    email,
    showRequestAccess,
    setPassword,
    setEmail,
    setShowRequestAccess,
    handleLogin,
    handleRequestAccess,
  } = Auth();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <Header />

        <Card className="terminal-card">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl matrix-text font-mono">
              {showRequestAccess ? 'REQUEST_ACCESS' : 'AUTHENTICATE'}
            </CardTitle>
            <p className="text-sm text-muted-foreground font-mono">
              {showRequestAccess
                ? '> Enter your credentials to request library access'
                : '> Enter password to access your personal library'}
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {showRequestAccess ? (
              <RequestAccessForm
                email={email}
                setEmail={setEmail}
                onSubmit={handleRequestAccess}
                onBack={() => setShowRequestAccess(false)}
              />
            ) : (
              <PasswordForm
                password={password}
                setPassword={setPassword}
                onSubmit={handleLogin}
                onRequestAccess={() => setShowRequestAccess(true)}
              />
            )}
          </CardContent>
        </Card>

        <Footer />
      </div>
    </div>
  );
}
