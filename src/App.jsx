import { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import WatchList from './components/WatchList';
import Home from './components/Home';

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
