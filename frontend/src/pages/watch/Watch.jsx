import { ArrowBackOutlined } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import './watch.scss';

export default function Watch() {
  const a = useNavigate();
  console.log(a);
  return (
    <div className='watch'>
      <Link to='/'>
        <div className='back'>
          <ArrowBackOutlined />
          Home
        </div>
      </Link>
      <video
        className='video'
        autoPlay
        progress
        controls
        src='https://media.istockphoto.com/videos/stroking-a-cat-by-a-computer-video-id1287253700'
      />
    </div>
  );
}
