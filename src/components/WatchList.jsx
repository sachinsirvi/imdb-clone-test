import React, { useState, useEffect } from 'react';
import { useWatchList } from '../context/WatchListContext';
import genreMap from '../genremap';
import Modal from '../components/Modal';

function WatchList() {
  const { watchList, setWatchList } = useWatchList();
  const [search, setSearch] = useState('');
  const [genreList, setGenreList] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState(['All Genres']);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = (e) => setSearch(e.target.value);

  const removeMovie = (id) => {
    const updated = watchList.filter((movie) => movie.id !== id);
    setWatchList(updated);
  };

  const handleAscRatings = () => {
    const sortedAsc = [...watchList].sort((a, b) => a.vote_average - b.vote_average);
    setWatchList(sortedAsc);
  };

  const handleDescRatings = () => {
    const sortedDesc = [...watchList].sort((a, b) => b.vote_average - a.vote_average);
    setWatchList(sortedDesc);
  };

  const handleGenreClick = (genre) => {
    if (genre === 'All Genres') {
      setSelectedGenres(['All Genres']);
    } else {
      // If already selected, remove it
      if (selectedGenres.includes(genre)) {
        const updatedGenres = selectedGenres.filter((g) => g !== genre);
        // If no genre left after removing, fallback to 'All Genres'
        setSelectedGenres(updatedGenres.length > 0 ? updatedGenres : ['All Genres']);
      } else {
        // If adding a genre, remove 'All Genres' from selection
        const updatedGenres = selectedGenres.filter((g) => g !== 'All Genres');
        setSelectedGenres([...updatedGenres, genre]);
      }
    }
  };
  

  useEffect(() => {
    const allGenreIds = watchList.flatMap((movie) => movie.genre_ids);
    const allGenreNames = allGenreIds.map((id) => genreMap[id]);
    const validGenres = allGenreNames.filter((name) => name !== undefined);
    const uniqueGenres = Array.from(new Set(validGenres));
    setGenreList(["All Genres", ...uniqueGenres]);
  }, [watchList]);

  const filteredMovies = watchList.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(search.toLowerCase());
    const movieGenres = movie.genre_ids?.map((id) => genreMap[id]);
    const matchesGenre =
      selectedGenres.includes('All Genres') ||
      movieGenres?.some((g) => selectedGenres.includes(g));
    return matchesSearch && matchesGenre;
  });

  return (
    <>
      {/* Genre Buttons */}
      <div className="flex justify-center flex-wrap gap-3 my-4">
        {genreList.map((genre) => (
          <button
            key={genre}
            onClick={() => handleGenreClick(genre)}
            className={`px-4 py-2 rounded ${
              selectedGenres.includes(genre)
                ? 'bg-yellow-400 text-black'
                : 'bg-gray-700 text-gray-300'
            } hover:bg-yellow-300`}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div className="flex justify-center mb-4">
        <input
          className="bg-gray-700 text-gray-300 border border-gray-600 rounded px-4 py-2 text-center"
          placeholder="Search Movies"
          type="text"
          onChange={handleSearch}
          value={search}
        />
      </div>

      {/* Movie List */}
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">My Watchlist</h1>

        {/* Table for medium and larger screens */}
        <div className="hidden md:block overflow-x-auto rounded-lg">
          <table className="w-full text-left bg-gray-800 rounded-lg overflow-hidden">
            <thead className="bg-gray-700 text-white">
              <tr>
                <th className="p-3">Poster</th>
                <th className="p-3">Name</th>
                <th className="p-3 flex items-center gap-1">
                  <i
                    onClick={handleAscRatings}
                    className="fa-solid fa-arrow-up cursor-pointer hover:text-yellow-400"
                  ></i>
                  Ratings
                  <i
                    onClick={handleDescRatings}
                    className="fa-solid fa-arrow-down cursor-pointer hover:text-yellow-400"
                  ></i>
                </th>
                <th className="p-3">Popularity</th>
                <th className="p-3">Genre</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody className="text-gray-300">
              {filteredMovies.length > 0 ? (
                filteredMovies.map((movie) => (
                  <tr
                    key={movie.id}
                    onClick={() => {
                      setSelectedMovie(movie);
                      setIsModalOpen(true);
                    }}
                    className="hover:bg-gray-700 border-b border-gray-700 cursor-pointer"
                  >
                    <td className="p-3">
                      <img
                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                        alt={movie.title}
                        className="w-20 h-auto rounded"
                      />
                    </td>
                    <td className="p-3 font-semibold">{movie.title}</td>
                    <td className="p-3">{movie.vote_average?.toFixed(2)}</td>
                    <td className="p-3">{movie.popularity?.toLocaleString()}</td>
                    <td className="p-3">
                      {movie.genre_ids?.map((id) => genreMap[id]).join(', ') || 'N/A'}
                    </td>
                    <td className="p-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeMovie(movie.id);
                        }}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-gray-400 p-8">
                    No movies found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Cards for small screens */}
        <div className="block md:hidden grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <div
                key={movie.id}
                onClick={() => {
                  setSelectedMovie(movie);
                  setIsModalOpen(true);
                }}
                className="bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transform transition-all duration-300 cursor-pointer"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-60 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-2">{movie.title}</h2>
                  <p>⭐ {movie.vote_average?.toFixed(1)} | 🔥 {movie.popularity?.toLocaleString()}</p>
                  <p className="text-sm mt-2">
                    {movie.genre_ids?.map((id) => genreMap[id]).join(', ') || 'N/A'}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeMovie(movie.id);
                    }}
                    className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-xl w-full"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400 p-8">
              No movies found.
            </p>
          )}
        </div>
      </div>
      
      {/* Modal */}
      {isModalOpen && (
        <Modal
          movie={selectedMovie}
          onClose={() => {
            setSelectedMovie(null);
            setIsModalOpen(false);
          }}
        />
      )}
    </>
  );
}

export default WatchList;
