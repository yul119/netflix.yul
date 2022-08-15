import React, { useState } from 'react';
import './resetPass.scss';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  showErrMsg,
  showSuccessMsg,
} from '../../utils/notification/notification';
import {
  isLength,
  isMatch,
} from '../../utils/validation/validation';
import { authAPIs } from '../../store/callAPIs';

const initialState = {
  password: '',
  cf_password: '',
  err: '',
  success: '',
};

const ResetPassword = () => {
  const [data, setData] = useState(initialState);
  const { accessToken } = useParams();
  console.log(useParams());

  const { password, cf_password, err, success } = data;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
      err: '',
      success: '',
    });
  };

  const handleResetPass = async () => {
    if (isLength(password))
      return setData({
        ...data,
        err: 'Password must be at least 8 characters.',
        success: '',
      });

    if (!isMatch(password, cf_password))
      return setData({
        ...data,
        err: 'Password did not match.',
        success: '',
      });
    console.log(password, accessToken);
    try {
      const res = await authAPIs.apiResetPass(
        password,
        accessToken
      );
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
        <div className='resetPage'>
          <h2>Reset Your Password</h2>

          {err && showErrMsg(err)}
          {success && showSuccessMsg(success)}

          <input
            type='password'
            name='password'
            id='password'
            placeholder='Enter your password'
            value={password}
            onChange={handleChangeInput}
          />

          <input
            type='password'
            name='cf_password'
            id='cf_password'
            placeholder='Enter your confirm password'
            value={cf_password}
            onChange={handleChangeInput}
          />

          <div className='row'>
            <button onClick={handleResetPass}>
              Reset Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
