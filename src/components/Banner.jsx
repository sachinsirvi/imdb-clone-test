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
      <section className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden">
        <img
          src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
          alt={movie.title}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

        {/* Movie Title */}
        <div className="absolute bottom-16 left-6 md:left-12">
          <h1 className="text-4xl md:text-6xl font-extrabold text-yellow-400 drop-shadow-lg">
            {movie.title}
          </h1>
        </div>
      </section>

      {/* Section Divider */}
      <div className="bg-black py-8">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-white mb-2">
          Explore Trending Movies
        </h2>
        <div className="h-1 w-24 bg-yellow-400 mx-auto rounded-full"></div>
      </div>
    </>
  );
}

export default Banner;
