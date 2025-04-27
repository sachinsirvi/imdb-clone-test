import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import WatchList from './components/WatchList';
import Home from './components/Home';
import './App.css';
import Footer from './components/Footer';


function App() {
  return (
    <div className="bg-black min-h-screen">
      <NavBar />
      <div className="max-w-7xl mx-auto px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/watchlist" element={<WatchList />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;