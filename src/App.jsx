import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import NotFound from './components/NotFound';
import './App.css';
import { Suspense, lazy } from 'react';

// Lazy loaded components
const Home = lazy(() => import('./components/Home'));
const WatchList = lazy(() => import('./components/WatchList'));

function App() {
  return (
    <div className="bg-black min-h-screen">
      <NavBar />
      <div className="max-w-7xl mx-auto px-4">
        <Suspense fallback={<div className="text-white text-center py-10">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/watchlist" element={<WatchList />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}

export default App;
