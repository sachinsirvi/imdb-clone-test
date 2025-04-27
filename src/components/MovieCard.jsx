import React, { useState } from 'react';
import { useWatchList } from '../context/WatchListContext';
import Modal from './Modal';
import PropTypes from 'prop-types';

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
        className="bg-gray-900 rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-105 duration-300 flex flex-col items-center cursor-pointer"
        onClick={handleCardClick}
      >
        <div className="w-full aspect-[2/3] overflow-hidden">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path || movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="p-4 w-full flex flex-col items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWatchList();
            }}
            className="text-3xl hover:scale-125 transition-transform duration-200"
          >
            {isInWatchList ? '❤️' : '🤍'}
          </button>
        </div>

      </div>

      {/* Modal */}
      {isModalOpen && <Modal movie={movie} onClose={closeModal} />}
    </>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
};

export default MovieCard;
