//hover listItem  7 8  listItem 9 cant display
import './listItem.scss';
import { useState } from 'react';
import {
  PlayCircleFilledWhiteOutlined,
  AddCircleOutlineOutlined,
  ThumbUpOffAltOutlined,
  ThumbDownAltOutlined,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const ListItem = ({ i, movie }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link to={{ pathname: '/watch', movie: movie }}>
      <div
        className='listItem'
        style={{
          left: isHovered && i * 280 - 50 + i * 2.5,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={movie.imgSm} alt='' />

        {isHovered && (
          <>
            <video
              src={movie.trailer}
              autoPlay={true}
              loop
            />
            <div className='movie'>
              <div className='feature'>
                <PlayCircleFilledWhiteOutlined
                  sx={{ fontSize: 28, marginRight: '10px' }}
                  classname='icon'
                />
                <AddCircleOutlineOutlined
                  classname='icon'
                  sx={{ fontSize: 28, marginRight: '10px' }}
                />
                <ThumbUpOffAltOutlined
                  classname='icon'
                  sx={{ fontSize: 28, marginRight: '10px' }}
                />
                <ThumbDownAltOutlined
                  classname='icon'
                  sx={{ fontSize: 28, marginRight: '10px' }}
                />
              </div>

              <span className='title'>{movie.title}</span>

              <div className='info'>
                <span>2h01m</span>
                <span className='limit'>
                  +{movie.limit}
                </span>
                <span>{movie.year}</span>
              </div>

              <div className='desc'>{movie.desc}</div>

              <div className='genre'>{movie.genre}</div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
};

export default ListItem;
