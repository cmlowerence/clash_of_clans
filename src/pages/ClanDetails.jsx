import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchFromCoC } from '../services/cocApi';
import { FaTrophy, FaUsers, FaGlobe, FaArrowLeft, FaShieldAlt } from 'react-icons/fa';

const ClanDetails = () => {
  const { tag } = useParams(); // Get tag from URL (e.g., #200)
  const [clan, setClan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getClanData = async () => {
      try {
        // The tag comes in without # usually, or encoded. 
        // We ensure it has one # for the API call
        const formattedTag = tag.startsWith('#') ? tag : `#${tag}`;
        const data = await fetchFromCoC(`clans/${formattedTag}`);
        setClan(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getClanData();
  }, [tag]);

  if (loading) return <div className="min-h-screen bg-neutral-900 text-white flex items-center justify-center">Loading Clan Intel...</div>;
  if (error) return <div className="min-h-screen bg-neutral-900 text-red-500 flex items-center justify-center p-4">Error: {error}</div>;
  if (!clan) return null;

  return (
    <div className="min-h-screen bg-neutral-900 text-white pb-20">
      
      {/* Header Banner */}
      <div className="bg-neutral-800 border-b border-yellow-600 p-6 shadow-2xl relative overflow-hidden">
        <Link to="/search" className="absolute top-4 left-4 text-gray-400 hover:text-white flex items-center z-20">
          <FaArrowLeft className="mr-2" /> Back
        </Link>
        
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center md:items-start pt-8 relative z-10">
          <img src={clan.badgeUrls.medium} alt="Badge" className="w-32 h-32 md:w-40 md:h-40 drop-shadow-2xl" />
          
          <div className="mt-4 md:mt-2 md:ml-8 text-center md:text-left">
            <h1 className="text-4xl font-extrabold uppercase tracking-wide">{clan.name}</h1>
            <p className="text-gray-400 font-mono text-sm">{clan.tag}</p>
            <p className="mt-4 text-gray-300 italic max-w-xl">"{clan.description}"</p>
          </div>
        </div>

        {/* Background Icon */}
        <FaShieldAlt className="absolute -right-10 -bottom-20 text-[300px] text-white/5 rotate-12" />
      </div>

      {/* Stats Grid */}
      <div className="max-w-4xl mx-auto px-4 -mt-8 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatBox label="Clan Level" value={clan.clanLevel} color="text-yellow-400" />
          <StatBox label="War Wins" value={clan.warWins} color="text-red-400" />
          <StatBox label="Points" value={clan.clanPoints} color="text-green-400" />
          <StatBox label="Members" value={`${clan.members}/50`} color="text-blue-400" />
        </div>
      </div>

      {/* Member List */}
      <div className="max-w-4xl mx-auto px-4 mt-12">
        <h3 className="text-2xl font-bold text-yellow-500 mb-6 border-l-4 border-yellow-500 pl-4">Member Roster</h3>
        
        <div className="grid gap-3">
          {clan.memberList && clan.memberList.map((member) => (
            <div key={member.tag} className="bg-neutral-800 p-4 rounded-lg flex items-center justify-between hover:bg-neutral-700 transition border border-transparent hover:border-gray-600">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-neutral-900 rounded-full flex items-center justify-center font-bold text-yellow-600 border border-gray-700">
                  {member.clanRank === 'leader' ? 'L' : member.clanRank === 'coLeader' ? 'Co' : member.clanRank === 'elder' ? 'E' : 'M'}
                </div>
                <div>
                  <h4 className="font-bold text-white">{member.name}</h4>
                  <p className="text-xs text-gray-500">{member.role}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 text-sm">
                 <div className="flex items-center text-gray-300">
                   <FaTrophy className="text-yellow-500 mr-1" /> {member.trophies}
                 </div>
                 <div className="hidden sm:block text-gray-500">
                   Donations: <span className="text-green-400">{member.donations}</span>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Helper Component for Stats
const StatBox = ({ label, value, color }) => (
  <div className="bg-neutral-800 p-4 rounded-xl shadow-lg border border-gray-700 text-center">
    <div className={`text-3xl font-bold ${color}`}>{value}</div>
    <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">{label}</div>
  </div>
);

export default ClanDetails;
