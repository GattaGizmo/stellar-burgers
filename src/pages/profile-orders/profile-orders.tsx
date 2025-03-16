import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect, useCallback } from 'react';
import { getOrders } from '../../services/slices/userSlice';
import { useAppDispatch, useAppSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state.user.orders) ?? [];

  const fetchOrders = useCallback(() => {
    dispatch(getOrders());
  }, [dispatch]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return <ProfileOrdersUI orders={orders} />;
};
