import React, { useState, useEffect } from 'react';
import './profile.scss';
import Navbar from '../../components/navbar/Navbar';
import { useSelector } from 'react-redux';
import {
  authSelector,
  tokenSelector,
} from '../../store/selector';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { authAPIs, userAPIs } from '../../store/callAPIs';
import {
  isLength,
  isMatch,
} from '../../utils/validation/validation';
import {
  showErrMsg,
  showSuccessMsg,
} from '../../utils/notification/notification';
import { useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate();

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

  const changeAvatar = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];

      if (!file)
        return setData({
          ...data,
          err: 'No files were uploaded.',
          success: '',
        });

      if (file.size > 1024 * 1024)
        return setData({
          ...data,
          err: 'Size too large.',
          success: '',
        });

      if (
        file.type !== 'image/jpeg' &&
        file.type !== 'image/png'
      )
        return setData({
          ...data,
          err: 'File format is incorrect.',
          success: '',
        });

      let formData = new FormData();
      formData.append('file', file);

      setLoading(true);
      const res = await userAPIs.uploadAvt(formData, token);

      setLoading(false);
      setAvatar(res.data.url);
    } catch (err) {
      setData({
        ...data,
        err: err.response.data.msg,
        success: '',
      });
    }
  };

  const updateInfor = () => {
    try {
      userAPIs.updateUser(
        name ? name : user.name,
        avatar ? avatar : user.avatar,
        token
      );
      setData({
        ...data,
        err: '',
        success: 'Updated Success!',
      });
    } catch (err) {
      setData({
        ...data,
        err: err.response.data.msg,
        success: '',
      });
    }
  };

  const updatePassword = () => {
    if (isLength(password))
      return setData({
        ...data,
        err: 'Password must be at least 6 characters.',
        success: '',
      });

    if (!isMatch(password, cf_password))
      return setData({
        ...data,
        err: 'Password did not match.',
        success: '',
      });

    try {
      authAPIs.apiResetPass(password, token);

      setData({
        ...data,
        err: '',
        success: 'Updated Success!',
        password: '',
        cf_password: '',
      });
    } catch (err) {
      setData({
        ...data,
        err: err.response.data.msg,
        success: '',
      });
    }
  };

  const handleUpdate = () => {
    console.log(data);
    if (name || avatar) {
      updateInfor();
      navigate(0);
    }
    if (password) updatePassword();
  };
  useEffect(() => {
    if (err) showErrMsg(err);
    if (success) showSuccessMsg(success);
    setData({
      ...user,
      err: '',
      success: '',
    });
  }, [err, success]);
  return (
    <div>
      <Navbar />
      <div className='profilePage'>
        <div className='container'>
          <div className='left'>
            <div className='avatar'>
              <img
                src={
                  !user ? '' : avatar ? avatar : user.avatar
                }
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
                  onChange={changeAvatar}
                />
              </span>
            </div>
          </div>
          <div className='right'>
            {/* {err && showErrMsg(err)} */}
            {/* {success && showSuccessMsg(success)} */}
            <div className='form-group'>
              <input
                type='text'
                name='name'
                id='name'
                defaultValue={!user ? '' : user.userName}
                placeholder={!user ? '' : user.userName}
                onChange={handleChange}
              />
            </div>

            <div className='form-group'>
              <input
                type='email'
                name='email'
                id='email'
                defaultValue={!user ? '' : user.email}
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
                onClick={handleUpdate}
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
