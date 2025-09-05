import { getRefreshToken } from "@/app/utils/getRefreshToken";

export async function POST(request) {
    try {
      // Step 1: Get auth token from Zoho
     
      const accessToken = await getRefreshToken();
  
      if (!accessToken) {
        throw new Error('Access token not received');
      }
  
      // Step 2: Fetch contacts data using the access token
      const { id,moduleName } = await request.json();
      const response = await fetch(`https://www.zohoapis.in/crm/v8/${moduleName}/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Zoho-oauthtoken ${accessToken}`,
        }
      });
      const data = await response.json();
      return Response.json({
        success: true,
        data: data
      });
  
    } catch (error) {
      console.error('Error fetching CRM data:', error);
      return Response.json({
        success: false,
        error: error.message
      }, { status: 500 });
    }
  }
  