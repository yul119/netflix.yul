import React, { useState } from 'react';
import './profile.scss';
import Navbar from '../../components/navbar/Navbar';
import { useSelector } from 'react-redux';
import {
  authSelector,
  tokenSelector,
} from '../../store/selector';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

const initialState = {
  name: '',
  password: '',
  cf_password: '',
  err: '',
  success: '',
};

const Profile = () => {
  const { token } = useSelector(tokenSelector);
  const { user } = useSelector(authSelector);
  console.log(token, user);

  const [data, setData] = useState(initialState);
  const { name, password, cf_password, err, success } =
    data;

  const [avatar, setAvatar] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
      err: '',
      success: '',
    });
  };

  return (
    <div>
      <Navbar />
      <div className='profilePage'>
        <div className='container'>
          <div className='left'>
            <div className='avatar'>
              <img
                src={avatar ? avatar : user.avatar}
                alt=''
              />
              <span>
                <CameraAltIcon
                  style={{
                    marginTop: '20px',
                    width: '32px',
                    height: '32px',
                  }}
                />
                <p>Change</p>
                <input
                  type='file'
                  name='file'
                  id='file_up'
                  //   onChange={changeAvatar}
                />
              </span>
            </div>
          </div>
          <div className='right'>
            <div className='form-group'>
              <input
                type='text'
                name='name'
                id='name'
                defaultValue={user.userName}
                placeholder={user.userName}
                onChange={handleChange}
              />
            </div>

            <div className='form-group'>
              <input
                type='email'
                name='email'
                id='email'
                defaultValue={user.email}
                placeholder='Your email address'
                disabled
              />
            </div>

            <div className='form-group'>
              <input
                type='password'
                name='password'
                id='password'
                placeholder='Your password'
                value={password}
                onChange={handleChange}
              />
            </div>

            <div className='form-group'>
              <input
                type='password'
                name='cf_password'
                id='cf_password'
                placeholder='Confirm password'
                value={cf_password}
                onChange={handleChange}
              />
            </div>
            <div className='btn'>
              <button
                disabled={loading}
                // onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
