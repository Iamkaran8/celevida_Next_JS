export async function GET(request) {
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
    const fields = [
      "Last_Name",
      "Age",
      "Mobile",
      "Height_",
      "Genders",
      "Weight",
      "Onboarding_Date",
      "Created_Time",
      "Body_Fat",
      "Visceral_Fat_Level",
      "Fat",
      "Muscle",
      "Muscle1",
      "Weight_Without_Fat",
      "Body_Age",
      "Bone_Mass_Kg",
      "Metabolism_BMR",
      "StatusPrespcription"
    ].join(',');

    const contactsResponse = await fetch(`https://www.zohoapis.in/crm/v8/Contacts?fields=${fields}`, {
      method: 'GET',
      headers: {
        'Authorization': `Zoho-oauthtoken ${accessToken}`,
        'Cookie': '_zcsr_tmp=2c457748-76e7-4104-8147-6df9dccc1b0b; crmcsr=2c457748-76e7-4104-8147-6df9dccc1b0b'
      }
    });
    const leadsResponse = await fetch(`https://www.zohoapis.in/crm/v8/Leads?fields=${fields}`, {
      method: 'GET',
      headers: {
        'Authorization': `Zoho-oauthtoken ${accessToken}`,
        'Cookie': '_zcsr_tmp=2c457748-76e7-4104-8147-6df9dccc1b0b; crmcsr=2c457748-76e7-4104-8147-6df9dccc1b0b'
      }
    });

    if (!contactsResponse.ok) {
      throw new Error(`Contacts API failed: ${contactsResponse.status}`);
    }
    if (!leadsResponse.ok) {
      throw new Error(`Leads API failed: ${leadsResponse.status}`);
    }

    let contactsData = await contactsResponse.json();
    // console.log(contactsData.data[0], "contactsData");

    contactsData.data = contactsData?.data.map(item => ({
      ...item,
      moduleName: 'Contacts'
    }));

    let leadsData = await leadsResponse.json();

    leadsData.data = leadsData?.data.map(item => ({
      ...item,
      moduleName: 'Leads'
    }));

    // Return the contacts data
    return Response.json({
      success: true,
      data: [
        ...contactsData?.data,
        ...leadsData?.data
      ]
    });

  } catch (error) {
    console.error('Error fetching CRM data:', error);
    return Response.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
