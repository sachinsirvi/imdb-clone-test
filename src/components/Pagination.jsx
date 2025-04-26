import React from 'react';

function Pagination({ nextPageFn, previousPageFn, pageNumber }) {
  return (
    <div className="flex justify-center items-center space-x-4 my-6">
      <button
        onClick={previousPageFn}
        className="bg-gray-900 hover:bg-yellow-300 text-white px-4 py-2 rounded-md transition-colors duration-300"
      >
        Previous
      </button>

      <span className="text-xl font-semibold text-white">{pageNumber}</span>

      <button
        onClick={nextPageFn}
        className="bg-gray-900 hover:bg-yellow-300 text-white px-4 py-2 rounded-md transition-colors duration-300"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
