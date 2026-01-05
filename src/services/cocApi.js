export const fetchFromCoC = async (endpoint) => {
  // We no longer need the token here locally! 
  // The Vercel function (api/proxy.js) will handle the token.
  
  // Encode # as %23
  const cleanEndpoint = endpoint.replace('#', '%23');
  
  // Call our own Vercel backend
  // We pass the CoC endpoint as a query parameter
  const response = await fetch(`/api/proxy?endpoint=${cleanEndpoint}`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    
    if (response.status === 403) {
      throw new Error("Access Denied: Vercel IP not whitelisted. (See instructions below)");
    }
    if (response.status === 404) {
      throw new Error("Not Found: Check the tag and try again.");
    }
    
    throw new Error(errorData.message || `Error ${response.status}`);
  }

  return await response.json();
};
