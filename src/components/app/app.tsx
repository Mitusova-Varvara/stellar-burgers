import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { Routes, Route } from 'react-router-dom';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Preloader } from '@ui';
import {
  AppDispatch,
  RootState,
  useDispatch,
  useSelector
} from '../../services/store';
import { getIngredientsThunk } from '../../services/ingredients/ingredients-slice';
import { useEffect } from 'react';
import { ProtectedRoute } from '../protected-route/protected-route';

const App = () => {
  /** TODO: взять переменные из стора */

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredientsThunk());
  }, []);

  const isIngredientsLoading = useSelector(
    (state: RootState) => state.ingredients.isLoading
  );
  const ingredients = useSelector(
    (state: RootState) => state.ingredients.ingredients
  );
  const error = null;

  return (
    <div className={styles.app}>
      <Routes>
        <Route path={'/'} element={<AppHeader />}>
          <Route
            path={'/'}
            element={
              isIngredientsLoading ? (
                <Preloader />
              ) : error ? (
                <div
                  className={`${styles.error} text text_type_main-medium pt-4`}
                >
                  {error}
                </div>
              ) : ingredients.length > 0 ? (
                <ConstructorPage />
              ) : (
                <div
                  className={`${styles.title} text text_type_main-medium pt-4`}
                >
                  Нет игредиентов
                </div>
              )
            }
          />
          <Route path={'/feed'} element={<Feed />} />
          <Route
            path={'/login'}
            element={
              <ProtectedRoute onlyUnAuth>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route path={'/register'} element={<Register />} />
          <Route path={'/forgot-password'} element={<ForgotPassword />} />
          <Route path={'/reset-password'} element={<ResetPassword />} />
          <Route path={'/profile'} element={<Profile />} />
          <Route path={'/profile/orders'} element={<ProfileOrders />} />
          <Route path={'*'} element={<NotFound404 />} />
          {/* <Route
            path={'/feed/:number'}
            element={
              <Modal
                title={''}
                onClose={function (): void {
                  throw new Error('Function not implemented.');
                }}
              >
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path={'/ingredients/:id'}
            element={
              <Modal
                title={''}
                onClose={function (): void {
                  throw new Error('Function not implemented.');
                }}
              >
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path={'/profile/orders/:number'}
            element={
              <Modal
                title={''}
                onClose={function (): void {
                  throw new Error('Function not implemented.');
                }}
              >
                <OrderInfo />
              </Modal>
            }
          /> */}
        </Route>
      </Routes>
    </div>
  );
};

export default App;
