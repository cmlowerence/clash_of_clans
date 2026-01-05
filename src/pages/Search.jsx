import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // <--- THIS WAS MISSING
import { fetchFromCoC } from '../services/cocApi';
import { FaSearch, FaUser, FaShieldAlt, FaTrophy } from 'react-icons/fa';

const Search = () => {
  const [activeTab, setActiveTab] = useState('clan'); 
  const [tag, setTag] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!tag) return;

    setLoading(true);
    setError('');
    setData(null);

    try {
      const endpoint = activeTab === 'clan' 
        ? `clans/${tag}` 
        : `players/${tag}`;
      
      const result = await fetchFromCoC(endpoint);
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-4 pb-20">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8 mt-4">
          <h2 className="text-3xl font-bold text-yellow-500 uppercase tracking-widest">Find Your Target</h2>
          <p className="text-gray-400 text-sm">Enter a tag to scout details</p>
        </div>

        {/* Search Box Container */}
        <div className="bg-neutral-800 rounded-xl shadow-lg border border-gray-700 overflow-hidden mb-8">
          
          {/* Tabs */}
          <div className="flex border-b border-gray-700">
            <button
              onClick={() => { setActiveTab('clan'); setData(null); setError(''); }}
              className={`flex-1 py-4 text-center font-bold transition-colors ${activeTab === 'clan' ? 'bg-yellow-600 text-black' : 'text-gray-400 hover:bg-neutral-700'}`}
            >
              <FaShieldAlt className="inline mb-1 mr-2" /> Find Clan
            </button>
            <button
              onClick={() => { setActiveTab('player'); setData(null); setError(''); }}
              className={`flex-1 py-4 text-center font-bold transition-colors ${activeTab === 'player' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-neutral-700'}`}
            >
              <FaUser className="inline mb-1 mr-2" /> Find Player
            </button>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSearch} className="p-6">
            <div className="relative">
              <input
                type="text"
                value={tag}
                onChange={(e) => setTag(e.target.value.toUpperCase())}
                placeholder={activeTab === 'clan' ? "#2PP..." : "#8QU..."}
                className="w-full bg-neutral-900 border-2 border-gray-600 rounded-full py-4 px-6 pl-12 text-lg text-white placeholder-gray-500 focus:border-yellow-500 outline-none transition"
              />
              <FaSearch className="absolute left-4 top-5 text-gray-500" />
              <button 
                type="submit" 
                disabled={loading}
                className="absolute right-2 top-2 bg-yellow-500 text-black font-bold py-2 px-6 rounded-full hover:bg-yellow-400 transition disabled:opacity-50"
              >
                {loading ? '...' : 'GO'}
              </button>
            </div>
            {error && <p className="text-red-500 mt-4 text-center bg-red-900/20 p-2 rounded">{error}</p>}
          </form>
        </div>

        {/* RESULTS SECTION */}
        {data && (
          <div className="animate-fade-in-up">
            
            {/* Warning if using Mock Data */}
            {data.name === "Mock Warriors" && (
               <div className="mb-4 bg-yellow-900/50 border border-yellow-600 text-yellow-200 text-xs p-2 rounded text-center">
                 ⚠️ DEMO MODE: Real API blocked. Showing sample data.
               </div>
            )}

            {activeTab === 'clan' ? (
              // CLAN CARD (Clickable)
              <Link to={`/clan/${data.tag.replace('#', '')}`}>
                <div className="bg-neutral-800 rounded-xl border border-yellow-600 p-6 relative overflow-hidden hover:scale-[1.02] transition-transform cursor-pointer">
                  <div className="flex items-center space-x-4 relative z-10">
                    <img src={data.badgeUrls?.medium} alt="Badge" className="w-20 h-20 drop-shadow-lg" />
                    <div>
                      <h3 className="text-2xl font-bold text-white">{data.name}</h3>
                      <p className="text-gray-400 text-sm">{data.tag}</p>
                      <div className="flex items-center mt-2 space-x-4 text-sm font-semibold">
                        <span className="text-yellow-400">
