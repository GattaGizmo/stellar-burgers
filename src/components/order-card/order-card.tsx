import { FC, memo, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { TIngredient } from '@utils-types';
import { useAppSelector } from '../../services/store';
import { OrderCardUI } from '../ui/order-card';
import { OrderCardProps } from './type';

const MAX_INGREDIENTS = 6;

export const OrderCard: FC<OrderCardProps> = memo(({ order }) => {
  const location = useLocation();
  const { ingredients } = useAppSelector((state) => state.ingredients);

  const orderInfo = useMemo(() => {
    if (!ingredients.length) return null;

    const ingredientsInfo = order.ingredients
      .map((id) => ingredients.find((ing) => ing._id === id))
      .filter(Boolean) as TIngredient[];

    const total = ingredientsInfo.reduce((acc, item) => acc + item.price, 0);

    const ingredientsToShow = ingredientsInfo.slice(0, MAX_INGREDIENTS);
    const remains = Math.max(ingredientsInfo.length - MAX_INGREDIENTS, 0);

    return {
      ...order,
      ingredientsInfo,
      ingredientsToShow,
      remains,
      total,
      date: new Date(order.createdAt)
    };
  }, [order, ingredients]);

  return orderInfo ? (
    <OrderCardUI
      orderInfo={orderInfo}
      maxIngredients={MAX_INGREDIENTS}
      locationState={{ background: location }}
    />
  ) : null;
});
