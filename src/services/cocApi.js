import { MOCK_CLAN } from './mockData';

export const fetchFromCoC = async (endpoint) => {
  // 1. Encode # as %23
  const cleanEndpoint = endpoint.replace('#', '%23');
  
  try {
    // 2. Try the real API
    const response = await fetch(`/api/proxy?endpoint=${cleanEndpoint}`);

    // 3. If Real API fails, use Backup
    if (!response.ok) {
      console.warn(`API Failed (${response.status}). Switching to Mock Data.`);
      
      // If we are searching for a clan or looking up clan details, return the Mock Clan
      if (endpoint.includes('clans')) {
        return MOCK_CLAN;
      }
      
      throw new Error(`API Error ${response.status}: Real data unavailable and no mock data for this type.`);
    }

    return await response.json();

  } catch (error) {
    console.warn("Network Error. Switching to Mock Data.");
    // Fallback for network crashes
    if (endpoint.includes('clans')) {
      return MOCK_CLAN;
    }
    throw error;
  }
};

