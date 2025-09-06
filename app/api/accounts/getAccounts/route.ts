import { getRefreshToken } from "@/app/utils/getRefreshToken";

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
    return Response.json({ success: true, data });
    } catch (error) {
        console.error('Error fetching CRM data:', error);
        return Response.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}