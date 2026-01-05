import { MOCK_CLAN, MOCK_PLAYER, MOCK_WAR_LOG } from './mockData';

export const fetchFromCoC = async (endpoint) => {
  // 1. Encode # as %23 because the API doesn't like the '#' symbol in URLs
  const cleanEndpoint = endpoint.replace('#', '%23');
  
  try {
    // 2. Try the real API via our Vercel Proxy
    const response = await fetch(`/api/proxy?endpoint=${cleanEndpoint}`);

    // 3. If Real API fails (e.g. 403 Access Denied or 500 Server Error), use Backup Data
    if (!response.ok) {
      console.warn(`API Failed (${response.status}). Switching to Mock Data.`);
      
      // Return Mock Player Data if requesting player details
      if (endpoint.includes('players')) {
        return MOCK_PLAYER;
      }

      // Return Mock War Log Data if requesting war history
      // Note: The real API wraps the array in an 'items' object, so we mimic that.
      if (endpoint.includes('warlog')) {
        return { items: MOCK_WAR_LOG };
      }
      
      // Return Mock Clan Data if requesting clan details
      if (endpoint.includes('clans')) {
        return MOCK_CLAN;
      }
      
      throw new Error(`API Error ${response.status}: Real data unavailable and no mock data for this type.`);
    }

    return await response.json();

  } catch (error) {
    console.warn("Network Error or Proxy Crash. Switching to Mock Data.");
    
    // Fallback for network crashes or fetch failures
    if (endpoint.includes('players')) return MOCK_PLAYER;
    if (endpoint.includes('warlog')) return { items: MOCK_WAR_LOG };
    if (endpoint.includes('clans')) return MOCK_CLAN;
    
    throw error;
  }
};

