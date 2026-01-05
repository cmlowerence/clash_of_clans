import fetch from 'node-fetch';

export default async function handler(request, response) {
  // 1. Handle CORS (Allow your app to talk to this function)
  response.setHeader('Access-Control-Allow-Credentials', true);
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  response.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  // 2. Handle Preflight (Browser checking if it's safe)
  if (request.method === 'OPTIONS') {
    response.status(200).end();
    return;
  }

  // 3. Extract the endpoint from the URL query
  // Example: /api/proxy?endpoint=clans/%23200
  const { endpoint } = request.query;

  if (!endpoint) {
    return response.status(400).json({ error: "No endpoint provided" });
  }

  // 4. Get the Token from Vercel Environment Variables
  // (We will set this in Vercel Settings later)
  const apiKey = process.env.VITE_COC_API_TOKEN;

  if (!apiKey) {
    return response.status(500).json({ error: "Server Configuration Error: API Token missing" });
  }

  try {
    // 5. Call Clash of Clans API
    const cocUrl = `https://api.clashofclans.com/v1/${endpoint}`;
    
    const apiResponse = await fetch(cocUrl, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json'
      }
    });

    const data = await apiResponse.json();

    // 6. Return data to your frontend
    return response.status(apiResponse.status).json(data);

  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}
