import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import WatchList from './components/WatchList';
import Home from './components/Home';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-black text-gray-900">
      <NavBar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/watchList" element={<WatchList />} />
          {/* Catch-all 404 Route */}
          <Route path="*" element={<div className="text-center text-3xl mt-10">404 - Page Not Found</div>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
