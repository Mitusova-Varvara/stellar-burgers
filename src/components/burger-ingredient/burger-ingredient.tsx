import { FC, memo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { getIngredientsThunk } from '../../services/ingredients/ingredients-slice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/services/store';
import { addIngredientToOrder } from '../../services/order/order.slice';

export const BurgerIngredient: FC<TBurgerIngredientProps> = ({
  ingredient,
  count
}) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const order = useSelector(
    (state: RootState) => state.order.current.ingredients
  );

  const handleAdd = () => {
    dispatch(addIngredientToOrder(ingredient));
  };

  return (
    <BurgerIngredientUI
      ingredient={ingredient}
      count={count}
      locationState={{ background: location }}
      handleAdd={handleAdd}
    />
  );
};
