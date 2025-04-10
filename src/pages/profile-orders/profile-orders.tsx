import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { getOrdersAll, getUserState } from '../../services/slices/userSlice';
import { getFeeds } from '../../services/slices/feedSlice';

export const ProfileOrders: FC = () => {
  const userOrders = useSelector(getUserState).userOrders;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrdersAll());
    dispatch(getFeeds());
  }, [dispatch]);

  const orders: TOrder[] = userOrders;

  return <ProfileOrdersUI orders={orders} />;
};
