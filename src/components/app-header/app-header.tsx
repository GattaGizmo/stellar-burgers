import { AppHeaderUI } from '@ui';
import { memo } from 'react';
import { useAppSelector } from '../../services/store';
import { useLocation } from 'react-router-dom';

export const AppHeader = memo(() => {
  const user = useAppSelector((state) => state.user.user);
  const location = useLocation();

  return (
    <AppHeaderUI userName={user?.name ?? ''} currentPath={location.pathname} />
  );
});
