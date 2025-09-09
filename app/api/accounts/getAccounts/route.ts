import { getRefreshToken } from "@/app/utils/getRefreshToken";

// CORS headers for allowing all domains
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS(request) {
    return new Response(null, {
        status: 200,
        headers: corsHeaders,
    });
}

export async function GET(request) {
    try {
    const accessToken = await getRefreshToken();
    const fields = [
        "Name",
        "role",
        "Email",
        "password",
        "city",
        "area"
      ].join(',');
  
      const response = await fetch(`https://www.zohoapis.in/crm/v8/celevidaAccount?fields=${fields}`, {
        method: 'GET',
        headers: {
            'Authorization': `Zoho-oauthtoken ${accessToken}`,
        },
    });
    const data = await response.json();
    return Response.json({ success: true, data }, {
        headers: corsHeaders,
    });
    } catch (error) {
        console.error('Error fetching CRM data:', error);
        return Response.json({
            success: false,
            error: error.message
        }, { 
            status: 500,
            headers: corsHeaders,
        });
    }
}