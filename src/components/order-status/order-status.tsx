import { OrderStatusUI } from '@ui';
import { FC, useMemo } from 'react';
import { OrderStatusProps } from './type';

const STATUS_TEXT: Record<string, string> = {
  created: 'Создан',
  pending: 'Готовится',
  done: 'Выполнен',
  canceled: 'Отменён'
};

const STATUS_COLOR: Record<string, string> = {
  created: '#F2F2F3',
  pending: '#E52B1A',
  done: '#00CCCC',
  canceled: '#FF0000'
};

export const OrderStatus: FC<OrderStatusProps> = ({ status }) => {
  const textStyle = useMemo(() => STATUS_COLOR[status] || '#F2F2F3', [status]);
  const statusText = useMemo(
    () => STATUS_TEXT[status] || 'Неизвестно',
    [status]
  );

  return <OrderStatusUI textStyle={textStyle} text={statusText} />;
};
