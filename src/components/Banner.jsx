import React, {useEffect,useState} from 'react';
import axios from 'axios';
import image from '../assets/bg.jpeg';



function Banner() {
  const [title, setTitle] = useState('');
  const [banner, setBanner] = useState(null);


useEffect(()=> {
  axios.get('https://api.themoviedb.org/3/trending/movie/day?api_key=8080d42c743d9136659263141a24671a')
  .then((response)=>{
    const result = response.data.results[0];
    const title = result.title;
    const image = result.backdrop_path;

    setTitle(title);
    setBanner(`https://image.tmdb.org/t/p/original/${image}`);
  })
  .catch((error)=>{console.error('Error-',error)});


},[]);


return (
  
  <div className="relative w-full max-w-screen-lg mx-auto transform transition-transform hover:scale-105 duration-300">
    <h1 className="text-2xl font-bold mb-4">Trending Movies</h1>
    <img className="cursor-pointer  w-full h-full object-cover" src={banner} alt="imageMovie" />
    <div className="absolute bottom-6 w-full mx-auto text-2xl text-white">{title}</div>
  </div>
);



}

export default Banner

