import React, { useState, useEffect } from 'react';
import './home.scss';
import Navbar from '../../components/navbar/Navbar';
import Featured from '../../components/featured/Featured';
import List from '../../components/list/List';
import { listAPIs } from '../../store/callAPIs';
import { useSelector } from 'react-redux';
import { authSelector } from '../../store/selector';

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

  const auth = useSelector(authSelector);
  console.log(auth);

  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await listAPIs.getList(type, genre);
        setLists(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomLists();
  }, [type, genre]);

  return (
    <div className='home'>
      <Navbar />
      <Featured type={type} setGenre={setGenre} />
      {lists.map((list, i) => (
        <List key={i} list={list} />
      ))}
    </div>
  );
};

export default Home;
