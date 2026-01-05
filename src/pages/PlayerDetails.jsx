import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchFromCoC } from '../services/cocApi';
import { FaArrowLeft, FaStar, FaShieldAlt, FaBolt } from 'react-icons/fa';

const PlayerDetails = () => {
  const { tag } = useParams();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPlayer = async () => {
      try {
        const data = await fetchFromCoC(`players/${tag}`);
        setPlayer(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getPlayer();
  }, [tag]);

  if (loading) return <div className="text-white text-center mt-20">Scouting Village...</div>;
  if (!player) return <div className="text-white text-center mt-20">Village not found.</div>;

  return (
    <div className="min-h-screen bg-neutral-900 text-white pb-20">
      
      {/* Header Banner */}
      <div className="bg-neutral-800 border-b border-blue-600 p-6 relative overflow-hidden">
        <Link to="/search" className="absolute top-4 left-4 text-gray-400 hover:text-white flex items-center z-20">
          <FaArrowLeft className="mr-2" /> Back
        </Link>
        
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center pt-8 relative z-10">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-extrabold uppercase tracking-wide text-white">{player.name}</h1>
            <p className="text-gray-400 font-mono text-sm">{player.tag}</p>
            <div className="mt-2 inline-flex items-center px-3 py-1 bg-yellow-600 text-black font-bold rounded-full text-sm">
              Town Hall {player.townHallLevel}
              {player.townHallWeaponLevel && <span className="ml-1 text-xs opacity-75"> (Weapon Lvl {player.townHallWeaponLevel})</span>}
            </div>
          </div>
          
          {/* League Icon */}
          {player.league && (
            <img src={player.league.iconUrls.medium} alt="League" className="w-24 h-24 md:ml-auto mt-4 md:mt-0 drop-shadow-xl" />
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 mt-8 space-y-8">
        
        {/* Heroes Section */}
        <div>
          <h3 className="text-xl font-bold text-blue-400 mb-4 border-l-4 border-blue-400 pl-3">Heroes</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {player.heroes?.filter(h => h.village === 'home').map((hero) => (
              <div key={hero.name} className="bg-neutral-800 p-3 rounded-lg border border-gray-700 text-center">
                <div className="text-yellow-500 text-lg font-bold">{hero.level}</div>
                <div className="text-sm text-gray-300">{hero.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Troops Section */}
        <div>
          <h3 className="text-xl font-bold text-green-400 mb-4 border-l-4 border-green-400 pl-3">Troops</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {player.troops?.filter(t => t.village === 'home').map((troop) => (
              <div key={troop.name} className="bg-neutral-800 p-2 rounded border border-gray-700 flex flex-col items-center justify-between h-24">
                <span className="text-xs text-center text-gray-400 leading-tight">{troop.name}</span>
                <span className="text-xl font-bold text-white mt-1">{troop.level}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default PlayerDetails;
