/*
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';

// Placeholder components for routes we haven't built yet
const Login = () => <div className="p-10 text-center text-white">Login Page Coming Soon</div>;
const Search = () => <div className="p-10 text-center text-white">Search API Page Coming Soon</div>;

function App() {
  return (
    <div className="min-h-screen bg-neutral-900">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </div>
  );
}

export default App;
*/

import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen bg-neutral-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold text-yellow-400 mb-4">It Works!</h1>
      <p className="text-xl">The white screen is gone.</p>
      <div className="mt-8 p-4 bg-gray-800 rounded-lg">
        <p>If you see this, the problem was likely the Swiper code.</p>
      </div>
    </div>
  );
};

export default Home;
