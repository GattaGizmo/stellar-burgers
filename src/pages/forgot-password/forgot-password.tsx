import { FC, SyntheticEvent, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { forgotPasswordApi } from '@api';
import { ForgotPasswordUI } from '@ui-pages';

export const ForgotPassword: FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | undefined>(undefined);
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      setError(undefined);

      try {
        await forgotPasswordApi({ email });
        localStorage.setItem('resetPassword', 'true');
        navigate('/reset-password', { replace: true });
      } catch (err) {
        setError((err as Error).message);
      }
    },
    [email, navigate]
  );

  return (
    <ForgotPasswordUI
      errorText={error}
      email={email}
      setEmail={setEmail}
      handleSubmit={handleSubmit}
    />
  );
};
