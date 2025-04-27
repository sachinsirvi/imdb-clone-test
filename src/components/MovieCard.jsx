import React, { useState } from 'react';
import { useWatchList } from '../context/WatchListContext';
import Modal from './Modal';

function MovieCard({ movie }) {
  const { watchList, setWatchList } = useWatchList();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isInWatchList = watchList.some((item) => item.id === movie.id);

  const toggleWatchList = () => {
    if (isInWatchList) {
      setWatchList(watchList.filter((item) => item.id !== movie.id));
    } else {
      setWatchList([...watchList, movie]);
    }
  };

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className="bg-black rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105 duration-300 flex flex-col items-center cursor-pointer"
        onClick={handleCardClick}
      >
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`}
          alt={movie.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-3 w-full text-center">
          <h3 className="text-yellow-400 font-semibold truncate text-sm">{movie.title}</h3>
          <div
            className="text-3xl cursor-pointer mt-2 hover:scale-110 transition-transform duration-200"
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click
              toggleWatchList();
            }}
          >
            {isInWatchList ? '❤️' : '🤍'}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && <Modal movie={movie} onClose={closeModal} />}
    </>
  );
}

export default MovieCard;
