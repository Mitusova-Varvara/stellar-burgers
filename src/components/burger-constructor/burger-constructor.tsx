import { FC, useMemo } from 'react';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector } from 'react-redux';
import { RootState } from 'src/services/store';
import { TCurrentOrder } from 'src/services/order/order.slice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems: TCurrentOrder = useSelector(
    (state: RootState) => state.order.current
  );

  const orderRequest = useSelector((state: RootState) => state.order.isLoading);

  const orderModalData = null;
  useSelector((state: RootState) => state.order.orderData);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
  };
  const closeOrderModal = () => {};

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients
        .map((i) => i.price)
        .reduce((s: number, v: number) => s + v, 0),
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
