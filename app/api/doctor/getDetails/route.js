export async function POST(request) {
    try {
      // Step 1: Get auth token from Zoho
      const tokenResponse = await fetch('https://accounts.zoho.in/oauth/v2/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cookie': '_zcsr_tmp=a6fa39ea-832d-4192-9592-6c788b58a835; iamcsr=a6fa39ea-832d-4192-9592-6c788b58a835; zalb_6e73717622=dea4bb29906843a6fbdf3bd5c0e43d1d'
        },
        body: new URLSearchParams({
          'grant_type': 'refresh_token',
          'client_id': '1000.KBTLU1N3JX4IR4JYSNTVJ3U9JFS5GF',
          'client_secret': 'bb4740b298fa601d2fc240bbc23d265d338896d3c5',
          'refresh_token': '1000.e66c4e8523293a4624de5a97f8291285.c4e96c6e52a5f5729bb1c8e71c0cc539'
        })
      });
  
      if (!tokenResponse.ok) {
        throw new Error(`Token API failed: ${tokenResponse.status}`);
      }
  
      const tokenData = await tokenResponse.json();
      const accessToken = tokenData.access_token;
  
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
  