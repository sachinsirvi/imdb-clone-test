import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setMoviePage } from '../redux/paginationSlice';

function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); 

  const handleLogoClick = () => {
    dispatch(setMoviePage(1));
    navigate('/');
  };

  return (
    <div className="bg-gray-900 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center py-4 px-6 space-y-4 md:space-y-0">
        {/* Logo Section */}
        <div className="flex items-center cursor-pointer" onClick={handleLogoClick}>
  <div className="text-3xl font-extrabold tracking-wider">
    <span className="text-yellow-400">Vite</span>
    <span className="text-white">Flix</span>
  </div>
</div>


        {/* Navigation Links */}
        <div className="flex space-x-6 md:space-x-8 text-base md:text-lg font-semibold">
          <Link
            to="/"
            className={`transition-transform transform hover:scale-110 duration-300 ${
              location.pathname === '/' ? 'text-yellow-400' : 'text-white'
            }`}
          >
            Movies
          </Link>
          <Link
            to="/watchlist"
            className={`transition-transform transform hover:scale-110 duration-300 ${
              location.pathname === '/watchlist' ? 'text-yellow-400' : 'text-white'
            }`}
          >
            Watchlist
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
