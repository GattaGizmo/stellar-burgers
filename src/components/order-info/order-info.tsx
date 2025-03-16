import { TIngredient } from '@utils-types';
import { FC, useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useAppSelector } from '../../services/store';
import { OrderInfoUI } from '../ui/order-info';
import { Preloader } from '../ui/preloader';

export const OrderInfo: FC = () => {
  const { number } = useParams();
  const location = useLocation();

  const { ingredients } = useAppSelector((state) => state.ingredients);
  const { orders: feedOrders = [] } = useAppSelector((state) => state.feed);
  const { orders: userOrders = [] } = useAppSelector((state) => state.user);

  const isProfileOrder = location.pathname.includes('/profile');
  const orders = isProfileOrder ? userOrders : feedOrders;

  const orderData = useMemo(() => {
    if (!orders || orders.length === 0) return null;
    return orders.find((order) => order.number === Number(number)) || null;
  }, [orders, number]);

  const orderInfo = useMemo(() => {
    if (!orderData || ingredients.length === 0) return null;

    const ingredientsMap = new Map(ingredients.map((ing) => [ing._id, ing]));

    const ingredientsInfo = orderData.ingredients.reduce<
      Record<string, TIngredient & { count: number }>
    >((acc, id) => {
      if (!ingredientsMap.has(id)) return acc;
      acc[id] = acc[id]
        ? { ...acc[id], count: acc[id].count + 1 }
        : { ...ingredientsMap.get(id)!, count: 1 };
      return acc;
    }, {});

    const total = Object.values(ingredientsInfo).reduce(
      (sum, item) => sum + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      total,
      date: new Date(orderData.createdAt)
    };
  }, [orderData, ingredients]);

  return orderInfo ? <OrderInfoUI orderInfo={orderInfo} /> : <Preloader />;
};
