import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from '../../components/MovieCard';
import Pagination from '../../components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { setMoviePage } from '../../redux/paginationSlice';

function Movies() {
  const moviePage = useSelector((state) => state.pagination.moviePage);
  const dispatch = useDispatch();
  const [movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(moviePage || 1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  if (!API_KEY) {
    console.error("TMDB API key is missing!");
  }
  
  useEffect(() => {
    setLoading(true);
    setError(false);
  
    if (!API_KEY) {
      setError(true);
      setLoading(false);
      return;
    }
  
    axios
      .get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&language=en-US&page=${pageNo}`)
      .then((response) => {
        setMovies(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setLoading(false);
        setError(true);
      });
  }, [pageNo]);
  

  const handleNext = () => {
    const newPageNo = pageNo + 1;
    setPageNo(newPageNo);
    dispatch(setMoviePage(newPageNo));
  };

  const handlePrevious = () => {
    if (pageNo > 1) {
      const newPageNo = pageNo - 1;
      setPageNo(newPageNo);
      dispatch(setMoviePage(newPageNo));
    }
  };

  // if loading, show only spinner
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 border-4 border-dashed border-yellow-400 rounded-full animate-spin"></div>
      </div>
    );
  }


  // if error
  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-center space-y-6">
        {/* Error Icon */}
        <div className="text-5xl text-red-500">
          ❗
        </div>
  
        {/* Error Text */}
        <div>
          <h2 className="text-2xl font-bold text-red-500 mb-2">
            Oops! Something went wrong.
          </h2>
          <p className="text-gray-400">
            Failed to load movies. Please try again later.
          </p>
        </div>
      </div>
    );
  }
  

  // Show movies or empty state
  return (
    <div className="p-4">
      {movies.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          <Pagination
            nextPageFn={handleNext}
            previousPageFn={handlePrevious}
            pageNumber={pageNo}
          />
        </>
      ) : (
        <div className="flex justify-center items-center min-h-[40vh]">
          <p className="text-gray-400 text-xl">No movies found.</p>
        </div>
      )}
    </div>
  );
}

export default Movies;
