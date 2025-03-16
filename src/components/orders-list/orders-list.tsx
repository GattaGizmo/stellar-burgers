import { FC, memo, useMemo } from 'react';
import { OrdersListUI } from '@ui';
import { OrdersListProps } from './type';

export const OrdersList: FC<OrdersListProps> = memo(({ orders }) => {
  const orderByDate = useMemo(
    () =>
      [...orders].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
    [orders]
  );

  return <OrdersListUI orderByDate={orderByDate} />;
});
