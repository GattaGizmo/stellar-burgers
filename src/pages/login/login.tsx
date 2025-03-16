import { LoginUI } from '@ui-pages';
import { FC, SyntheticEvent, useState, useCallback } from 'react';
import { Navigate } from 'react-router-dom';
import { loginUser } from '../../services/slices/userSlice';
import { useAppDispatch, useAppSelector } from '../../services/store';

export const Login: FC = () => {
  const dispatch = useAppDispatch();
  const { error, isAuthenticated } = useAppSelector((state) => state.user);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      dispatch(loginUser({ email, password }));
    },
    [dispatch, email, password]
  );

  if (isAuthenticated) return <Navigate to='/' replace />;

  return (
    <LoginUI
      errorText={error || ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
