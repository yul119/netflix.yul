import { useEffect } from 'react';
import './app.scss';
import Home from './pages/home/Home';
import Watch from './pages/watch/Watch';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import { Routes, Route, Navigate } from 'react-router-dom';
import ActivationEmail from './pages/activationEmail/AtivationEmail';
import { useDispatch, useSelector } from 'react-redux';
import {
  authSelector,
  tokenSelector,
} from './store/selector';
import { authAPIs } from './store/callAPIs';
import { setToken } from './store/slice/tokenSlice';
import {
  getUserInfo,
  loginAction,
} from './store/slice/authSlice';
import NotFound from './pages/notfound/Notfound';
import ForgotPassword from './pages/forgotPass/ForgotPass';
import ResetPassword from './pages/resetPass/ResetPass';
import Profile from './pages/profile/Profile';

const App = () => {
  const dispatch = useDispatch();
  const { token } = useSelector(tokenSelector);
  const auth = useSelector(authSelector);

  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin');
    if (firstLogin) {
      const getToken = async () => {
        const res = await authAPIs.apiGetAccessToken();
        dispatch(setToken(res.data.accessToken));
      };
      getToken();
    }
  }, [auth.isLogin, dispatch]);

  useEffect(() => {
    if (token) {
      const getUser = () => {
        dispatch(loginAction());
        dispatch(getUserInfo(token));
      };
      getUser();
    }
  }, [token, dispatch]);

  return (
    <Routes>
      <Route
        path='/'
        element={
          auth.isLogin ? (
            <Home />
          ) : (
            <Navigate to='/login' replace />
          )
        }
      />
      <Route
        path='/movies'
        element={
          auth.isLogin ? (
            <Home type='movies' />
          ) : (
            <Navigate to='/login' replace />
          )
        }
      />
      <Route
        path='/series'
        element={
          auth.isLogin ? (
            <Home type='series' />
          ) : (
            <Navigate to='/login' replace />
          )
        }
      />
      <Route
        path='/profile'
        element={auth.isLogin ? <Profile /> : <NotFound />}
      />
      <Route
        path='/register'
        element={
          !auth.isLogin ? (
            <Register />
          ) : (
            <Navigate to='/' replace />
          )
        }
      />
      <Route
        path='/user/activate/:activationToken'
        element={
          auth.isLogin ? <NotFound /> : <ActivationEmail />
        }
      />
      <Route
        path='/login'
        element={
          !auth.isLogin ? (
            <Login />
          ) : (
            <Navigate to='/' replace />
          )
        }
      />
      <Route
        path='/watch'
        element={auth.isLogin ? <Watch /> : <NotFound />}
      />
      <Route
        path='/forgot-password'
        element={
          auth.isLogin ? <NotFound /> : <ForgotPassword />
        }
      />
      <Route
        path='/user/reset/:accessToken'
        element={
          auth.isLogin ? <NotFound /> : <ResetPassword />
        }
      />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default App;
