import {
  InfoOutlined,
  PlayArrow,
} from '@mui/icons-material';
import './featured.scss';
import { useState, useEffect } from 'react';
import { movieAPIs } from '../../store/callAPIs';

export default function Featured({ type, setGenre }) {
  const [content, setContent] = useState({});

  useEffect(() => {
    const getRandomContent = async () => {
      try {
        const res = await movieAPIs.getRandomMovie(type);
        setContent(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomContent();
  }, [type]);

  return (
    <div className='featured'>
      {type && (
        <div className='category'>
          <span>
            {type === 'movies' ? 'Movies' : 'Series'}
          </span>
          <select
            name='genre'
            id='genre'
            onChange={(e) => setGenre(e.target.value)}
          >
            <option>Genre</option>
            <option value='adventure'>Adventure</option>
            <option value='comedy'>Comedy</option>
            <option value='fantasy'>Fantasy</option>
            <option value='historical'>Historical</option>
            <option value='romance'>Romance</option>
            <option value='western'>Western</option>
            <option value='animation'>Animation</option>
            <option value='drama'>Drama</option>
            <option value='documentary'>Documentary</option>
          </select>
        </div>
      )}
      <img
        src='https://thegioidienanh.vn/stores/news_dataimages/hoangtuan/122016/16/03/1353_bai_do_nhan_1.jpg'
        alt=''
      />
      <div className='info'>
        <img src={content.imgTitle} alt='' />
        <span className='desc'>{content.desc}</span>
        <div className='buttons'>
          <button className='play'>
            <PlayArrow />
            <span>Play</span>
          </button>
          <button className='more'>
            <InfoOutlined />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
}
