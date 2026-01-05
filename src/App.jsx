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
