import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';

interface Props {
  email: string;
  setEmail: (val: string) => void;
  onSubmit: () => void;
  onBack: () => void;
}

export default function RequestAccessForm({ email, setEmail, onSubmit, onBack }: Props) {
  return (
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
        <Button onClick={onSubmit} variant="hack" className="flex-1" disabled={!email.trim()}>
          <Lock className="w-4 h-4" />
          SUBMIT_REQUEST
        </Button>
        <Button onClick={onBack} variant="terminal">
          BACK
        </Button>
      </div>
    </>
  );
}
