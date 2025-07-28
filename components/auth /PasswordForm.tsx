import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Terminal } from 'lucide-react';

interface Props {
  password: string;
  setPassword: (val: string) => void;
  onSubmit: () => void;
  onRequestAccess: () => void;
}

export default function PasswordForm({
  password,
  setPassword,
  onSubmit,
  onRequestAccess,
}: Props) {
  return (
    <>
      <div className="space-y-2">
        <label className="text-sm font-mono matrix-text">PASSWORD</label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && onSubmit()}
          placeholder="Enter access code..."
          className="font-mono bg-code-bg border-terminal-border focus:border-matrix focus:ring-matrix"
        />
      </div>
      <div className="flex gap-2">
        <Button onClick={onSubmit} variant="hack" className="flex-1" disabled={!password.trim()}>
          <Terminal className="w-4 h-4" />
          ENTER_SYSTEM
        </Button>
        <Button onClick={onRequestAccess} variant="terminal">
          REQUEST_ACCESS
        </Button>
      </div>
    </>
  );
}
