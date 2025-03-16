import { ProfileMenuUI } from '@ui';
import { FC, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../services/slices/userSlice';
import { useAppDispatch } from '../../services/store';

export const ProfileMenu: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = useCallback(async () => {
    await dispatch(logoutUser());
    navigate('/');
  }, [dispatch, navigate]);

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
