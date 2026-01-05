// This function handles all communication with Clash of Clans
export const fetchFromCoC = async (endpoint) => {
  const token = localStorage.getItem('coc_api_token');

  if (!token) {
    throw new Error("No API Token found. Please Login.");
  }

  // We fetch from '/api' which Vite forwards to 'https://api.clashofclans.com/v1'
  // We must encode the '#' in tags as '%23'
  const cleanEndpoint = endpoint.replace('#', '%23');
  
  const response = await fetch(`/api/${cleanEndpoint}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    if (response.status === 403) {
      throw new Error("Access Denied: Your IP might not match the key, or the key is invalid.");
    }
    if (response.status === 404) {
      throw new Error("Not Found: Check the tag and try again.");
    }
    throw new Error(errorData.message || `Error ${response.status}: Something went wrong`);
  }

  return await response.json();
};
