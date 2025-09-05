import { getRefreshToken } from "@/app/utils/getRefreshToken";

export async function GET(request) {
  try {

    const accessToken = await getRefreshToken();

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
