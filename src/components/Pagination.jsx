import React from 'react';

function Pagination({ nextPageFn, previosuPageFn, pageNumber }) {
  return (
    <div className="flex justify-center items-center space-x-4 my-6">
      <button onClick={previosuPageFn} className="bg-blue-500 text-white px-4 py-2 rounded">Previous</button>
      <span className="text-lg">{pageNumber}</span>
      <button onClick={nextPageFn} className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
    </div>
  );
}

export default Pagination;
