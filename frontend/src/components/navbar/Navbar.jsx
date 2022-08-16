import React, { useState } from 'react';
import './navbar.scss';
import { Search, ArrowDropDown } from '@mui/icons-material';
import { authAPIs } from '../../store/callAPIs';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authSelector } from '../../store/selector';
const Navbar = () => {
  const [isTop, setIsTop] = useState(true);

  const auth = useSelector(authSelector);

  const handleLogout = async () => {
    try {
      await authAPIs.apiLogout();
      localStorage.removeItem('firstLogin');
      window.location.href = '/';
    } catch (err) {
      window.location.href = '/';
    }
  };

  window.onscroll = () => {
    setIsTop(window.pageYOffset === 0 ? true : false);
    return () => (window.onscroll = null);
  };

  return (
    <div className={isTop ? 'navbar' : 'navbar scrolled'}>
      <div className='container'>
        <div className='left'>
          <img
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png'
            alt=''
          />
          <Link to='/'>
            <span>Home</span>
          </Link>
          <Link to='/movies'>
            <span>Movies</span>
          </Link>
          <Link to='/series'>
            <span>Series</span>
          </Link>
          <span>New and popular</span>
          <span>My list</span>
        </div>
        <div className='right'>
          {/* <Search className='icon' /> */}
          <span>
            Hello, {auth.user && auth.user.userName}
          </span>

          <div className='profile'>
            <img
              src={auth.user && auth.user.avatar}
              alt=''
            />
            <ArrowDropDown className='icon' />
            <div className='options'>
              <Link to='/profile'>
                <span>Profile</span>
              </Link>
              <span onClick={handleLogout}>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
