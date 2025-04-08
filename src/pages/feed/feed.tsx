import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect, useCallback } from 'react';
import { fetchFeed } from '../../services/slices/feedSlice';
import { useAppDispatch, useAppSelector } from '../../services/store';

export const Feed: FC = () => {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((state) => state.feed);

  useEffect(() => {
    dispatch(fetchFeed());
  }, [dispatch]);

  const handleGetFeeds = useCallback(() => dispatch(fetchFeed()), [dispatch]);

  if (!orders?.length) return <Preloader />;

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
