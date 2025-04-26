import React, { useEffect, useState } from 'react';
import axios from 'axios';
import image from '../assets/bg.jpeg'; // (backup unused for now)

function Banner() {
  const [title, setTitle] = useState('');
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${import.meta.env.VITE_TMDB_API_KEY}`)
      .then((response) => {
        const result = response.data.results[0];
        const title = result.title;
        const image = result.backdrop_path;

        setTitle(title);
        setBanner(`https://image.tmdb.org/t/p/original/${image}`);
      })
      .catch((error) => {
        console.error('Error fetching trending movie:', error);
      });
  }, []);

  return (
    <div className="relative w-full max-w-screen-lg mx-auto transform transition-transform hover:scale-105 duration-300 p-2">
      <h1 className="text-2xl font-bold mb-4 text-white text-center">Trending Movies</h1>

      {banner ? (
        <>
          <img
            className="cursor-pointer w-full h-full object-cover rounded-md"
            src={banner}
            alt="Trending Movie"
          />
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center text-2xl font-semibold text-white bg-black bg-opacity-50 px-4 py-2 rounded-md">
            {title}
          </div>
        </>
      ) : (
        <div className="h-64 flex items-center justify-center text-gray-400 text-xl">
          Loading...
        </div>
      )}
    </div>
  );
}

export default Banner;
