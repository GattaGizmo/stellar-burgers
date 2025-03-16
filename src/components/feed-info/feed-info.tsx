import { FC, useMemo } from 'react';

import { TOrder } from '@utils-types';
import { useAppSelector } from '../../services/store';
import { FeedInfoUI } from '../ui/feed-info';

const filterOrdersByStatus = (orders: TOrder[], status: string): number[] =>
  useMemo(
    () =>
      orders
        .filter((order) => order.status === status)
        .slice(0, 20)
        .map((order) => order.number),
    [orders, status]
  );

export const FeedInfo: FC = () => {
  const { orders, total, totalToday } = useAppSelector((state) => state.feed);

  const readyOrders = filterOrdersByStatus(orders, 'done');
  const pendingOrders = filterOrdersByStatus(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={{ total, totalToday }}
    />
  );
};
