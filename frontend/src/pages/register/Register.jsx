import React, { useState } from 'react';
import './register.scss';
import { Link } from 'react-router-dom';
import {
  showErrMsg,
  showSuccessMsg,
} from '../../utils/notification/notification.js';
import {
  isEmpty,
  isEmail,
  isLength,
  isMatch,
} from '../../utils/validation/validation.js';
import { authAPIs } from '../../store/callAPIs.js';

const initialState = {
  userName: '',
  email: '',
  password: '',
  confirmPassword: '',
  err: '',
  success: '',
};

const Register = () => {
  const [user, setUser] = useState(initialState);

  const {
    userName,
    email,
    password,
    confirmPassword,
    err,
    success,
  } = user;

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
    if (isEmpty(userName) || isEmpty(password))
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

    if (isLength(password))
      return setUser({
        ...user,
        err: 'Password must be at least 8 characters.',
        success: '',
      });

    if (!isMatch(password, confirmPassword))
      return setUser({
        ...user,
        err: 'Password did not match.',
        success: '',
      });

    try {
      const res = await authAPIs.apiRegister(
        userName,
        email,
        password
      );

      console.log(res);

      setUser({ ...user, err: '', success: res.data.msg });
    } catch (err) {
      err.response.data.msg &&
        setUser({
          ...user,
          err: err.response.data.msg,
          success: '',
        });
    }
  };

  return (
    <div className='Register'>
      <div className='top'>
        <div className='wrapper'>
          <img
            className='logo'
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png'
            alt=''
          />
          <Link to='/login'>
            <button className='loginButton'>Sign In</button>
          </Link>
        </div>
      </div>

      <div className='registerPage'>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
        <br />

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='userName'>Name</label>
            <input
              type='text'
              placeholder='Enter your name'
              id='userName'
              value={userName}
              name='userName'
              onChange={handleChangeInput}
            />
          </div>

          <div>
            <label htmlFor='email'>Email Address</label>
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
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              placeholder='Enter password'
              id='password'
              value={password}
              name='password'
              onChange={handleChangeInput}
            />
          </div>

          <div>
            <label htmlFor='conformPassword'>
              Confirm Password
            </label>
            <input
              type='password'
              placeholder='Confirm password'
              id='confirmPassword'
              value={confirmPassword}
              name='confirmPassword'
              onChange={handleChangeInput}
            />
          </div>

          <div className='row'>
            <button disabled={success} type='submit'>
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
