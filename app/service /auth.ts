import { useState } from 'react';

export function Auth() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showRequestAccess, setShowRequestAccess] = useState(false);

  const handleLogin = () => {
  
  };

  const handleRequestAccess = () => {
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
