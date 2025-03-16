import { FC, useMemo } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../services/store';
import { Preloader } from '../ui/preloader';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,
  onlyUnAuth = false
}) => {
  const { isAuthenticated, isAuthChecked } = useAppSelector(
    (state) => state.user
  );
  const location = useLocation();

  const from = useMemo(() => location.state?.from || '/', [location.state]);

  if (!isAuthChecked) return <Preloader />;

  if (onlyUnAuth && isAuthenticated) return <Navigate to={from} />;

  if (!onlyUnAuth && !isAuthenticated)
    return <Navigate to='/login' state={{ from: location }} />;

  return children;
};
