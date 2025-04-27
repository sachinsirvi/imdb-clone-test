import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Banner() {
  const [movie, setMovie] = useState(null);

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  if (!API_KEY) {
    console.error("TMDB API key is missing in Banner!");
  }
  
  useEffect(() => {
    if (!API_KEY) return;
  
    axios
      .get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`)
      .then((response) => {
        const result = response.data.results[0];
        setMovie(result);
      })
      .catch((error) => {
        console.error('Error fetching trending movie:', error);
      });
  }, []);
  

  if (!movie || !movie.backdrop_path) {
    return null;
  }

  return (
    <>
      {/* Banner */}
      <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] bg-gray-900 overflow-hidden">
        <img
          src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
        <div className="absolute bottom-10 left-6 md:left-12">
          <h1 className="text-3xl md:text-5xl font-bold text-yellow-400">
            {movie.title}
          </h1>
        </div>
      </div>

      {/* Section Heading */}
      <h2 className="text-2xl md:text-3xl font-bold text-center text-white mt-8">
        Explore Trending Movies
      </h2>
    </>
  );
}

export default Banner;
