import React, { useState, useEffect } from 'react';
import './activationEmail.scss';
import { Link, useParams } from 'react-router-dom';
import {
  showErrMsg,
  showSuccessMsg,
} from '../../utils/notification/notification';
import { authAPIs } from '../../store/callAPIs';

function ActivationEmail() {
  const { activationToken } = useParams();
  const [err, setErr] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (activationToken) {
      const activationEmail = async () => {
        try {
          const res = await authAPIs.apiActivationEmail(
            activationToken
          );
          setSuccess(res.data.msg);
        } catch (err) {
          err.response.data.msg &&
            setErr(err.response.data.msg);
        }
      };
      activationEmail();
    }
  }, [activationToken]);

  return (
    <div className='activation'>
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
      <div className='activePage'>
        <h2>from netfclone.yul</h2>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
      </div>
    </div>
  );
}

export default ActivationEmail;
