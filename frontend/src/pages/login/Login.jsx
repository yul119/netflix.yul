import React, { useState } from 'react';
import './login.scss';
import { Link, useNavigate } from 'react-router-dom';
import {
  showErrMsg,
  showSuccessMsg,
} from '../../utils/notification/notification';
import {
  isEmpty,
  isEmail,
} from '../../utils/validation/validation.js';
import { useDispatch } from 'react-redux';
import { authAPIs } from '../../store/callAPIs';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { loginAction } from '../../store/slice/authSlice';

const initialState = {
  email: '',
  password: '',
  err: '',
  success: '',
};

const Login = () => {
  const [user, setUser] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { email, password, err, success } = user;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
      err: '',
      success: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEmpty(email) || isEmpty(password))
      return setUser({
        ...user,
        err: 'Please fill in all fields.',
        success: '',
      });

    if (!isEmail(email))
      return setUser({
        ...user,
        err: 'Invalid emails.',
        success: '',
      });
    try {
      const res = await authAPIs.apiLogin(email, password);
      setUser({ ...user, err: '', success: res.data.msg });

      localStorage.setItem('firstLogin', true);

      dispatch(loginAction());
      navigate('/');
    } catch (err) {
      err.response.data.msg &&
        setUser({
          ...user,
          err: err.response.data.msg,
          success: '',
        });
    }
  };

  const responseGoogle = async (response) => {
    console.log('test');
    // try {
    // const res = await authAPIs.apiGoogleLogin(
    // response.tokenId
    // );
    // console.log(res);
    // setUser({
    //   ...user,
    //   error: '',
    //   success: res.data.msg,
    // });
    // localStorage.setItem('firstLogin', true);

    // dispatch(loginAction());
    // navigate('/');
    // } catch (err) {
    //   err.response.data.msg &&
    //     setUser({
    //       ...user,
    //       err: err.response.data.msg,
    //       success: '',
    //     });
    // }
  };
  //   const responseFacebook = async (response) => {
  //     try {
  //       const { accessToken, userID } = response;
  //       const res = await axios.post('/user/facebook_login', {
  //         accessToken,
  //         userID,
  //       });

  //       setUser({
  //         ...user,
  //         error: '',
  //         success: res.data.msg,
  //       });
  //       localStorage.setItem('firstLogin', true);

  //       dispatch(dispatchLogin());
  //       history.push('/');
  //     } catch (err) {
  //       err.response.data.msg &&
  //         setUser({
  //           ...user,
  //           err: err.response.data.msg,
  //           success: '',
  //         });
  //     }
  //   };

  return (
    <div className='login'>
      <div className='top'>
        <div className='wrapper'>
          <img
            className='logo'
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png'
            alt=''
          />
        </div>
      </div>

      <div className='loginPage'>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
        <form onSubmit={handleSubmit}>
          <div>
            {/* <label htmlFor='email'>Email Address</label> */}
            <input
              type='text'
              placeholder='Enter email address'
              id='email'
              value={email}
              name='email'
              onChange={handleChangeInput}
            />
          </div>

          <div>
            {/* <label htmlFor='password'>Password</label> */}
            <input
              type='password'
              placeholder='Enter password'
              id='password'
              value={password}
              name='password'
              onChange={handleChangeInput}
            />
          </div>

          <div className='row'>
            <button type='submit'>Login</button>
          </div>
        </form>
        <div className='hr'>Or Login With</div>
        <div className='social'>
          <div className='google'>
            <GoogleLogin
              clientId='310055488729-26ou1ufirli5omtmi53cg41qj5ejlee9.apps.googleusercontent.com'
              buttonText='Login with google'
              style={{
                textAlign: 'center',
                backgroundColor: 'white',
              }}
              // onSuccess={responseGoogle}
              // onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
          </div>
          <div className='facebook'>
            <FacebookLogin
              // appId='Your facebook app id'
              autoLoad={false}
              fields='name,email,picture'
              // callback={responseFacebook}
            />
          </div>
        </div>

        <div className='more'>
          <p>
            New Customer?{' '}
            <Link to='/register'>Register</Link>
          </p>{' '}
          <Link to='/forgot-password'>
            Forgot your password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
