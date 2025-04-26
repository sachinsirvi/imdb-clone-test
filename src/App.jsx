import { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import NavBar from './pages/app/NavBar';
import WatchList from './pages/app/WatchList';
import Home from './pages/app/Home';

function App() {

  return (
    <>
      <NavBar />
      <Routes>


        <Route
          path="/"
          element={
            <>
              <Home />
            </>
          }
        />


        <Route
          path="/watchList"
          element={<WatchList />}
        />


      </Routes>
    </>
  );
}

export default App;
