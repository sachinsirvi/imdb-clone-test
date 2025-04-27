import React from 'react';
import PropTypes from 'prop-types';

function Pagination({ nextPageFn, previousPageFn, pageNumber }) {
  return (
    <div className="flex justify-center items-center space-x-8 mt-10 mb-2">
      <button
        onClick={previousPageFn}
        className="bg-gray-800 hover:bg-yellow-400 hover:text-black text-white font-semibold px-6 py-2 rounded-full shadow-md transition-all duration-300 transform hover:scale-105"
      >
        Previous
      </button>
      
      <span className="text-white font-bold text-lg">{pageNumber}</span>
      
      <button
        onClick={nextPageFn}
        className="bg-gray-800 hover:bg-yellow-400 hover:text-black text-white font-semibold px-6 py-2 rounded-full shadow-md transition-all duration-300 transform hover:scale-105"
      >
        Next
      </button>
    </div>
  );
}

Pagination.propTypes = {
  nextPageFn: PropTypes.func.isRequired,
  previousPageFn: PropTypes.func.isRequired,
  pageNumber: PropTypes.number.isRequired,
};

export default Pagination;
