import React, { createContext, useContext, useState, useEffect } from 'react';

const WatchListContext = createContext();

export const WatchListProvider = ({ children }) => {
  const [watchList, setWatchList] = useState(() => {
    const stored = localStorage.getItem('watchList');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('watchList', JSON.stringify(watchList));
  }, [watchList]);

  return (
    <WatchListContext.Provider value={{ watchList, setWatchList }}>
      {children}
    </WatchListContext.Provider>
  );
};

export const useWatchList = () => useContext(WatchListContext);
