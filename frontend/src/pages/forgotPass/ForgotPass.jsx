import React, { useState } from 'react';
import './forgotPass.scss';
import { Link } from 'react-router-dom';
import { isEmail } from '../../utils/validation/validation';
import {
  showErrMsg,
  showSuccessMsg,
} from '../../utils/notification/notification';
import { authAPIs } from '../../store/callAPIs';

const initialState = {
  email: '',
  err: '',
  success: '',
};

const ForgotPassword = () => {
  const [data, setData] = useState(initialState);

  const { email, err, success } = data;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
      err: '',
      success: '',
    });
  };

  const forgotPassword = async () => {
    if (!isEmail(email))
      return setData({
        ...data,
        err: 'Invalid emails.',
        success: '',
      });

    try {
      const res = await authAPIs.apiForgotPass(email);

      return setData({
        ...data,
        err: '',
        success: res.data.msg,
      });
    } catch (err) {
      err.response.data.msg &&
        setData({
          ...data,
          err: err.response.data.msg,
          success: '',
        });
    }
  };

  return (
    <div className='fgp'>
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
        <div className='fgpPage'>
          <h2>
            You forgot password? Enter email and reset your
            password.
          </h2>

          {err && showErrMsg(err)}
          {success && showSuccessMsg(success)}

          <input
            type='email'
            name='email'
            id='email'
            placeholder='Enter your email'
            value={email}
            onChange={handleChangeInput}
          />
          <div className='row'>
            <button onClick={forgotPassword}>
              Verify your email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
