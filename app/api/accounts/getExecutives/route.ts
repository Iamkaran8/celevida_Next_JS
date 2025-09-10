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
    const accessToken = await getRefreshToken();
    try {
    const response = await fetch(`https://www.zohoapis.in/crm/v8/celevidaAccount/search?criteria=((role:equals:Field Executive))`, {
        method: 'GET',
        headers: {
            'Authorization': `Zoho-oauthtoken ${accessToken}`,
        },
    });
    try {
    const data = await response.json();
    const doctors = data.data.map((doctor) => ({
      doctor: doctor.Name
    }));

    const doctorNames = doctors.map((doctor) => doctor.doctor);

    return Response.json({ success: true, doctorNames }, {
        headers: corsHeaders,
    });
    } catch (error) {
        console.error('Error fetching CRM data:', error);
        return Response.json({
            success: false,
            error: 'Invalid credentials'
        }, { 
            status: 500,
            headers: corsHeaders,
        });
    }

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