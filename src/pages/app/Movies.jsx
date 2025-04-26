import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from '../../components/MovieCard';
import Pagination from '../../components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { setMoviePage } from '../../redux/paginationSlice';
import AppLoader from '../../components/Loader';

function Movies() {
  const moviePage = useSelector((state) => state.pagination.moviePage);
  const dispatch = useDispatch();
  const [movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(moviePage || 1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setPageNo(moviePage);
  }, [moviePage]);

  useEffect(() => {
    setLoading(true);
    setError(false);

    axios
      .get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=${pageNo}`)
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

  if (loading) {
    return <AppLoader loading={loading} />;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 text-2xl mt-10">
        Failed to load movies. Please try again later.
      </div>
    );
  }

  return (
    <div className="p-4">
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
    </div>
  );
}

export default Movies;
