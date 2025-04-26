import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import Pagination from './Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { setMoviePage } from '../../redux/paginationSlice';
import AppLoader from '../components/Loader';

function Movies({ addToWatchList, watchList }) {
  const moviePage = useSelector((state) => state.pagination.moviePage);
  const dispatch = useDispatch();
  const [movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(moviePage || 1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPageNo(moviePage);
  }, [moviePage]);

  useEffect(() => {
    setLoading(true); // Show loading before API call
    axios
      .get(`https://api.themoviedb.org/3/trending/movie/day?api_key=8080d42c743d9136659263141a24671a&language=en-US&page=${pageNo}`)
      .then((response) => {
        setMovies(response.data.results);
        setLoading(false); // Hide loading after data fetched
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setLoading(false); // Hide loading even if error
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


  return (
    !loading ? <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-6 px-6 py-8">
        {movies.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </div>

      <Pagination
        nextPageFn={handleNext}
        previosuPageFn={handlePrevious}
        pageNumber={pageNo}
      />
    </div> : <AppLoader loading={loading} />
  );
}

export default Movies;
