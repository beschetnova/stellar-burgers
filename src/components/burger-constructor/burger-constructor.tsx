import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/store';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { getUserState } from '../../services/slices/userSlice/userSlice';
import {
  getBurgerConstructorState,
  createOrder,
  clearOrder,
  setRequest
} from '../../services/slices/burgerConstructorSlice/burgerConstructorSlice';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { constructorItems, orderModalData, orderRequest } = useSelector(
    getBurgerConstructorState
  );
  const isAuth = useSelector(getUserState).isAuthenticated;

  let arr: string[] = [];
  const ingredients: string[] | void = constructorItems.ingredients.map(
    (i) => i._id
  );
  if (constructorItems.bun) {
    const bun = constructorItems.bun?._id;
    arr = [bun, ...ingredients, bun];
  }

  const onOrderClick = () => {
    if (isAuth && constructorItems.bun) {
      dispatch(setRequest(true));
      dispatch(createOrder(arr));
    } else if (isAuth && !constructorItems.bun) {
      return;
    } else if (!isAuth) {
      navigate('/login');
    }
  };
  const closeOrderModal = () => {
    dispatch(setRequest(false));
    dispatch(clearOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
