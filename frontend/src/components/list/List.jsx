import './list.scss';
import {
  ArrowBackIos,
  ArrowForwardIos,
} from '@mui/icons-material';
import ListItem from '../listItem/ListItem';
import { useRef, useState } from 'react';

const List = ({ list }) => {
  const [slideNum, setSlideNum] = useState(0);
  const listRef = useRef();

  const handleSlider = (derection) => {
    const container = listRef.current;
    const distance =
      container.getBoundingClientRect().x - 70;

    if (derection === 'left' && slideNum > 0) {
      setSlideNum((prev) => prev - 1);
      container.style.transform = `translateX(${
        285 + distance
      }px)`;
    }
    if (derection === 'right' && slideNum < 5) {
      setSlideNum((prev) => prev + 1);
      container.style.transform = `translateX(${
        -285 + distance
      }px)`;
    }
  };

  return (
    <div className='list'>
      <span className='title-list'>{list.title}</span>
      <div className='wrapper'>
        <div
          className='arrow left'
          onClick={() => handleSlider('left')}
        >
          <ArrowBackIos />
        </div>
        <div className='container' ref={listRef}>
          {list.movies.map((item, i) => {
            // console.log(item);
            return <ListItem i={i} movie={item} />;
          })}
        </div>
        <div
          className='arrow right'
          onClick={() => handleSlider('right')}
        >
          <ArrowForwardIos />
        </div>
      </div>
    </div>
  );
};

export default List;
