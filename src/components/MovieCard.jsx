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
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105 duration-300 flex flex-col items-center">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`}
        alt={movie.title}
        className="w-full h-64 object-cover"
      />
      <div className="p-2 w-full text-center">
        <h3 className="text-base font-semibold truncate">{movie.title}</h3>
        <div
          className="text-2xl cursor-pointer mt-1"
          onClick={toggleWatchList}
        >
          {isInWatchList ? '❤️' : '🤍'}
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
