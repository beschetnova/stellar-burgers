import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { getUserState } from '../../services/slices/userSlice';

export const AppHeader: FC = () => {
  const user = useSelector(getUserState).userData;
  return <AppHeaderUI userName={user?.name} />;
};
