import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

function Modal({ movie, onClose }) {
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!movie) return;

    // Lock background scroll
    document.body.style.overflow = "hidden";

    const fetchTrailer = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
        );

        const trailers = response.data.results;
        const officialTrailer = trailers.find(
          (vid) => vid.type === 'Trailer' && vid.site === 'YouTube'
        );

        if (officialTrailer) {
          setTrailerKey(officialTrailer.key);
        } else {
          setTrailerKey(null);
        }
      } catch (error) {
        console.error('Error fetching trailer:', error);
        setTrailerKey(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTrailer();

    // Unlock scroll when modal closes
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [movie]);

  if (!movie) return null;

  return (
    <div
      id="modalBackdrop"
      className="fixed inset-0 z-50 flex justify-center items-start bg-black bg-opacity-60 backdrop-blur-sm overflow-auto py-10 px-4"
      onClick={(e) => {
        if (e.target.id === 'modalBackdrop') {
          onClose();
        }
      }}
    >
      <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-2xl text-gray-300 relative overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-white text-2xl hover:text-red-500"
        >
          &times;
        </button>

        {/* Scrollable Inner Content */}
        <div className="max-h-[80vh] overflow-y-auto pr-2">
          {/* Movie Title */}
          <h2 className="text-2xl font-bold mb-4 text-yellow-400">{movie.title}</h2>

          {/* Overview */}
          <p className="mb-6">{movie.overview || "No description available."}</p>

          {/* Trailer Section */}
          {loading ? (
            <div className="flex justify-center items-center my-8">
              <div className="w-12 h-12 border-4 border-yellow-400 border-dashed rounded-full animate-spin"></div>
            </div>
          ) : trailerKey ? (
            <div className="w-full h-72 mb-6 overflow-hidden rounded-lg shadow-lg">
              <iframe
                src={`https://www.youtube.com/embed/${trailerKey}`}
                title="Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full rounded-lg"
              ></iframe>
            </div>
          ) : (
            <p className="text-center text-gray-400 mb-4">Trailer not available.</p>
          )}
        </div>

        {/* Close Button Below */}
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}

Modal.propTypes = {
  movie: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};


export default Modal;
