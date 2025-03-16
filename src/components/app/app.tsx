import { useEffect, useCallback } from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate
} from 'react-router-dom';
import '../../index.css';
import styles from './app.module.css';

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

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';

import { ProtectedRoute } from '../protected-route';

import { fetchFeed } from '../../services/slices/feedSlice';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';
import { fetchUser, getOrders } from '../../services/slices/userSlice';
import store, { useAppDispatch, useAppSelector } from '../../services/store';

const useInitializeApp = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchIngredients()).catch((error) => {
      console.error(
        'Ошибка при загрузке ингредиентов:',
        error.message || 'Неизвестная ошибка'
      );
    });
    dispatch(fetchUser());
  }, [dispatch]);
};

const useHandleRoutes = (background: boolean) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    if (!background) {
      const path = location.pathname;
      if (path.startsWith('/feed/')) {
        dispatch(fetchFeed()).catch((error) => {
          console.error(
            'Ошибка при загрузке ленты заказов:',
            error.message || 'Неизвестная ошибка'
          );
        });
      } else if (path.startsWith('/profile/orders/') && user) {
        dispatch(getOrders());
      }
    }
  }, [background, dispatch, location.pathname, user]);
};

const AppContent = () => {
  useInitializeApp();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state?.background;

  useHandleRoutes(!!background);

  const closeIngredientModal = useCallback(() => navigate('/'), [navigate]);
  const closeFeedModal = useCallback(() => navigate('/feed'), [navigate]);
  const closeProfileOrderModal = useCallback(
    () => navigate('/profile/orders'),
    [navigate]
  );

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <OrderInfo />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={closeIngredientModal}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/feed/:number'
            element={
              <Modal title='Заказ' onClose={closeFeedModal}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal title='Заказ' onClose={closeProfileOrderModal}>
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  </Provider>
);

export default App;
