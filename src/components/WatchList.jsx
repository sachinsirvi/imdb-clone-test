import React, { useState, useEffect } from 'react';
import { useWatchList } from '../context/WatchListContext';
import genreMap from '../genremap';

function WatchList() {
  const { watchList, setWatchList } = useWatchList();
  const [search, setSearch] = useState('');
  const [genreList, setGenreList] = useState([]);
  const [currGenre, setCurrGenre] = useState('All Genres');

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const removeMovie = (id) => {
    const updated = watchList.filter((movie) => movie.id !== id);
    setWatchList(updated);
  };

  const handleAscRatings = () => {
    const sortedAsc = [...watchList].sort(
      (a, b) => a.vote_average - b.vote_average
    );
    setWatchList(sortedAsc);
  };

  const handleDescRatings = () => {
    const sortedDesc = [...watchList].sort(
      (a, b) => b.vote_average - a.vote_average
    );
    setWatchList(sortedDesc);
  };

  useEffect(() => {
    const allGenreIds = watchList.flatMap((movie) => movie.genre_ids);
    const allGenreNames = allGenreIds.map((id) => genreMap[id]);
    const validGenres = allGenreNames.filter((name) => name !== undefined);
    const uniqueGenres = Array.from(new Set(validGenres));
    setGenreList(["All Genres", ...uniqueGenres]);
  }, [watchList]);

  return (
    <>
      {/* Genre Buttons */}
      <div className="flex justify-center flex-wrap gap-3 my-4">
        {genreList.map((genre) => (
          <button
            key={genre}
            onClick={() => setCurrGenre(genre)}
            className={`px-4 py-2 rounded ${currGenre === genre ? 'bg-blue-500 text-white' : 'bg-gray-200'
              } hover:bg-blue-400`}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div className="flex justify-center mb-4">
        <input
          className="bg-gray-200 border border-gray-400 px-4 text-center"
          placeholder="Search Movies"
          type="text"
          onChange={handleSearch}
          value={search}
        />
      </div>

      {/* Watchlist Table */}
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">My Watchlist</h1>

        {watchList.length === 0 ? (
          <p className="text-center text-lg">No movies added yet.</p>
        ) : (
          <table className="w-full border border-gray-200 text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border">Poster</th>
                <th className="p-3 border">Name</th>
                <th className="p-3 border flex items-center gap-1">
                  <i
                    onClick={handleAscRatings}
                    className="fa-solid fa-arrow-up cursor-pointer mx-1 hover:text-yellow-400"
                  ></i>
                  Ratings
                  <i
                    onClick={handleDescRatings}
                    className="fa-solid fa-arrow-down cursor-pointer mx-1 hover:text-yellow-400"
                  ></i>
                </th>
                <th className="p-3 border">Popularity</th>
                <th className="p-3 border">Genre</th>
                <th className="p-3 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {watchList
                .filter((movie) => {
                  const matchesSearch = movie.title
                    .toLowerCase()
                    .includes(search.toLowerCase());

                  const movieGenres = movie.genre_ids?.map(
                    (id) => genreMap[id]
                  );
                  const matchesGenre =
                    currGenre === 'All Genres' ||
                    movieGenres?.includes(currGenre);

                  return matchesSearch && matchesGenre;
                })
                .map((movie) => (
                  <tr key={movie.id} className="hover:bg-gray-50">
                    <td className="p-3 border">
                      <img
                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                        alt={movie.title}
                        className="w-20 h-auto rounded"
                      />
                    </td>
                    <td className="p-3 border font-semibold">{movie.title}</td>
                    <td className="p-3 border">
                      {movie.vote_average?.toFixed(2)}
                    </td>
                    <td className="p-3 border">
                      {movie.popularity?.toLocaleString()}
                    </td>
                    <td className="p-3 border">
                      {movie.genre_ids
                        ?.map((id) => genreMap[id])
                        .join(', ') || 'N/A'}
                    </td>
                    <td className="p-3 border">
                      <button
                        onClick={() => removeMovie(movie.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default WatchList;
