import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Search from './pages/Search';
import ClanDetails from './pages/ClanDetails'; // Import new page

function App() {
  return (
    <div className="min-h-screen bg-neutral-900">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<Search />} />
        {/* The :tag part is dynamic, it will grab whatever tag we click */}
        <Route path="/clan/:tag" element={<ClanDetails />} />
      </Routes>
    </div>
  );
}

export default App;
