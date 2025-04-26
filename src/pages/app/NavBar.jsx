import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/movieLogo.png';
import { useDispatch } from 'react-redux';
import { setMoviePage } from '../../redux/paginationSlice';


function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    dispatch(setMoviePage(1));
    navigate('/');
  };

  return (
    <div className='flex py-5 pl-1 space-x-8 items-center'>
      <img
        className="w-12 cursor-pointer"
        src={Logo}
        alt='logo'
        onClick={handleLogoClick}
      />

      <div className='text-blue-600 font-bold space-x-8 text-2xl '>
        <Link to="/" className='cursor-pointer inline-block transform transition-transform hover:scale-110 duration-300'> Movies </Link>
        <Link to="/watchlist" className='cursor-pointer inline-block transform transition-transform hover:scale-105 duration-300'>WatchList</Link>
      </div>
    </div>
  );
}

export default NavBar;
