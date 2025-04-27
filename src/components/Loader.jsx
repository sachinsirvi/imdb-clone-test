import React from 'react';

function Loader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <div className="w-12 h-12 border-4 border-dashed border-yellow-400 rounded-full animate-spin mb-4"></div>
    </div>
  );
}

export default Loader;
