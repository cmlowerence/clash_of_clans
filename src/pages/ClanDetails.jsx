import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchFromCoC } from '../services/cocApi';
import { FaTrophy, FaArrowLeft, FaShieldAlt, FaHistory, FaUsers, FaStar } from 'react-icons/fa';

const ClanDetails = () => {
  const { tag } = useParams();
  const [activeTab, setActiveTab] = useState('members'); // 'members' or 'warlog'
  const [clan, setClan] = useState(null);
  const [warLog, setWarLog] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch Basic Clan Info
  useEffect(() => {
    const getClanData = async () => {
      try {
        const formattedTag = tag.startsWith('#') ? tag : `#${tag}`;
        const data = await fetchFromCoC(`clans/${formattedTag}`);
        setClan(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getClanData();
  }, [tag]);

  // Fetch War Log when tab is clicked
  const handleWarLogTab = async () => {
    setActiveTab('warlog');
    if (!warLog) {
      try {
        const formattedTag = tag.startsWith('#') ? tag : `#${tag}`;
        const data = await fetchFromCoC(`clans/${formattedTag}/warlog`);
        setWarLog(data.items);
      } catch (err) {
        console.error("Failed to load war log", err);
      }
    }
  };

  if (loading) return <div className="min-h-screen bg-neutral-900 text-white flex items-center justify-center">Loading Clan Intel...</div>;
  if (!clan) return <div className="min-h-screen bg-neutral-900 text-white text-center pt-20">Clan not found.</div>;

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

      {/* TABS */}
      <div className="max-w-4xl mx-auto px-4 mt-8">
        <div className="flex border-b border-gray-700 mb-6">
          <button
            onClick={() => setActiveTab('members')}
            className={`mr-8 pb-3 font-bold text-lg flex items-center transition ${activeTab === 'members' ? 'text-yellow-500 border-b-2 border-yellow-500' : 'text-gray-500 hover:text-gray-300'}`}
          >
            <FaUsers className="mr-2" /> Members
          </button>
          <button
            onClick={handleWarLogTab}
            className={`pb-3 font-bold text-lg flex items-center transition ${activeTab === 'warlog' ? 'text-yellow-500 border-b-2 border-yellow-500' : 'text-gray-500 hover:text-gray-300'}`}
          >
            <FaHistory className="mr-2" /> War Log
          </button>
        </div>

        {/* TAB CONTENT: MEMBERS */}
        {activeTab === 'members' && (
          <div className="grid gap-3 animate-fade-in-up">
            {clan.memberList && clan.memberList.map((member) => (
              <Link key={member.tag} to={`/player/${member.tag.replace('#','')}`}>
                <div className="bg-neutral-800 p-4 rounded-lg flex items-center justify-between hover:bg-neutral-700 transition border border-transparent hover:border-gray-600 cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-neutral-900 rounded-full flex items-center justify-center font-bold text-yellow-600 border border-gray-700">
                      {member.clanRank === 'leader' ? 'L' : member.clanRank === 'coLeader' ? 'Co' : 'M'}
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
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* TAB CONTENT: WAR LOG */}
        {activeTab === 'warlog' && (
          <div className="space-y-4 animate-fade-in-up">
            {!warLog ? (
              <div className="text-center text-gray-500 py-10">Loading War History...</div>
            ) : warLog.length === 0 ? (
               <div className="text-center text-gray-500 py-10">War Log is Private or Empty.</div>
            ) : (
              warLog.map((war, index) => (
                <div key={index} className={`bg-neutral-800 rounded-lg p-4 border-l-4 ${war.result === 'win' ? 'border-green-500' : 'border-red-500'} shadow-lg`}>
                  <div className="flex justify-between items-center mb-3">
                    <span className={`uppercase font-black text-xl ${war.result === 'win' ? 'text-green-400' : 'text-red-400'}`}>
                      {war.result === 'win' ? 'VICTORY' : 'DEFEAT'}
                    </span>
                    <span className="text-xs text-gray-500">{new Date(war.endTime).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    {/* My Clan */}
                    <div className="text-left">
                      <div className="text-white font-bold">{war.clan.name}</div>
                      <div className="text-yellow-400 flex items-center text-sm"><FaStar className="mr-1"/> {war.clan.stars}</div>
                      <div className="text-gray-500 text-xs">{war.clan.destructionPercentage}% Dest.</div>
                    </div>

                    <div className="text-2xl font-bold text-gray-600">VS</div>

                    {/* Opponent */}
                    <div className="text-right">
                      <div className="text-white font-bold">{war.opponent.name}</div>
                      <div className="text-yellow-400 flex items-center justify-end text-sm">{war.opponent.stars} <FaStar className="ml-1"/></div>
                      <div className="text-gray-500 text-xs">{war.opponent.destructionPercentage}% Dest.</div>
                    </div>
                  </div>
                </div>
              ))
            )}
            
            {/* Disclaimer for private logs */}
            {warLog && warLog.length > 0 && (
                <p className="text-center text-xs text-gray-500 mt-4">
                  Note: Some clans keep their war log private.
                </p>
            )}
          </div>
        )}

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

