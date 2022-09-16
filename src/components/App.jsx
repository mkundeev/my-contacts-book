import { Routes, Route } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getToken } from 'redux/selectors';
import { useGetUserQuery } from 'redux/contactsAPI';
import { ToastContainer } from 'react-toastify';
import PublicRoute from 'Routs/PublicRoute';
import PrivateRoute from 'Routs/PrivateRoute';

import { setUser } from 'redux/reducer';

const Header = lazy(() => import('./Header' /* webpackChunkName: "header" */));
const RegistrationPage = lazy(() =>
  import('../pages/RegistartionPage' /* webpackChunkName: "registration" */)
);
const AuthorizationPage = lazy(() =>
  import('pages/AuthorizationPage' /* webpackChunkName: "authorization" */)
);
const ContactsPage = lazy(() =>
  import('pages/ContactsPage' /* webpackChunkName: "contacts" */)
);

function App() {
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const { data } = useGetUserQuery('', { skip: !token });
  useEffect(() => {
    if (data) {
      dispatch(setUser({ user: data }));
    }
  }, [data, dispatch]);

  return (
    <div>
      <Suspense fallback={<div>...Loading</div>}>
        <Header />
        <Routes>
          <Route
            path="/registration"
            element={
              <PublicRoute>
                <RegistrationPage />
              </PublicRoute>
            }
          />
          <Route
            path="/authorization"
            element={
              <PublicRoute>
                <AuthorizationPage />
              </PublicRoute>
            }
          />
          <Route
            path="/contacts"
            element={
              <PrivateRoute>
                <ContactsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="*"
            element={
              <PublicRoute>
                <RegistrationPage />
              </PublicRoute>
            }
          />
        </Routes>
      </Suspense>
      <ToastContainer theme="colored" autoClose={3000} />
    </div>
  );
}

export { App };
