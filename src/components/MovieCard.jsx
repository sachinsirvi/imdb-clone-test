import React from 'react';
import { useWatchList } from '../context/WatchListContext';

function MovieCard({ movie }) {
  const { watchList, setWatchList } = useWatchList();

  const isInWatchList = watchList.some((item) => item.id === movie.id);

  const toggleWatchList = () => {
    if (isInWatchList) {
      setWatchList(watchList.filter((item) => item.id !== movie.id));
    } else {
      setWatchList([...watchList, movie]);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105 duration-300 flex flex-col items-center ">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`}
        alt={movie.title}
        className="w-full h-64 object-cover"
      />
      <div className="p-3 w-full text-center">
        <h3 className="text-base font-semibold truncate text-gray-300">{movie.title}</h3>
        <div
          className="text-3xl cursor-pointer mt-2 hover:scale-110 transition-transform duration-200"
          onClick={toggleWatchList}
        >
          {isInWatchList ? '❤️' : '🤍'}
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
