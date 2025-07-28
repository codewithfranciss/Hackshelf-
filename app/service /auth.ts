import { useState } from 'react';

export function Auth(onLogin: () => void) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showRequestAccess, setShowRequestAccess] = useState(false);

  const handleLogin = () => {
    if (password.trim()) onLogin();
  };

  const handleRequestAccess = () => {
    alert("Access request submitted. You'll hear back soon.");
    setEmail('');
    setShowRequestAccess(false);
  };

  return {
    password,
    email,
    showRequestAccess,
    setPassword,
    setEmail,
    setShowRequestAccess,
    handleLogin,
    handleRequestAccess,
  };
}
