export default async function handler(request, response) {
  // 1. Handle CORS
  response.setHeader('Access-Control-Allow-Credentials', true);
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  response.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (request.method === 'OPTIONS') {
    response.status(200).end();
    return;
  }

  try {
    const { endpoint } = request.query;

    if (!endpoint) {
      return response.status(400).json({ error: "No endpoint provided" });
    }

    // 2. Check for API Key
    const apiKey = process.env.VITE_COC_API_TOKEN;
    if (!apiKey) {
      console.error("API Token is MISSING in Vercel Environment Variables");
      return response.status(500).json({ error: "Server Config Error: Token missing" });
    }

    // 3. Native Fetch (No import needed in Node 18+)
    const cocUrl = `https://api.clashofclans.com/v1/${endpoint}`;
    
    const apiResponse = await fetch(cocUrl, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json'
      }
    });

    // 4. Handle API Errors gracefully
    if (!apiResponse.ok) {
        const errorText = await apiResponse.text();
        console.error(`CoC API Error: ${apiResponse.status} - ${errorText}`);
        return response.status(apiResponse.status).json({ 
            error: `Clash API Error: ${apiResponse.status}`, 
            details: errorText 
        });
    }

    const data = await apiResponse.json();
    return response.status(200).json(data);

  } catch (error) {
    console.error("Proxy Crash:", error);
    return response.status(500).json({ error: error.message });
  }
}

