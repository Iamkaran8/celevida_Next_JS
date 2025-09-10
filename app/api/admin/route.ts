import { getRefreshToken } from "@/app/utils/getRefreshToken";

// Function to convert date string to the required format
function convertToRequiredFormat(dateString) {
  const date = new Date(dateString);
  
  // Get ISO string and replace Z with +00:00
  const isoString = date.toISOString();
  
  // Replace milliseconds and Z with the required format
  // From: 2025-08-09T18:30:00.000Z
  // To: 2025-08-09T18:52:56+00:00
  const formattedDate = isoString.replace(/\.\d{3}Z$/, '+00:00');
  
  return formattedDate;
}

// Function to create URL-encoded date range filter
function createDateRangeFilter(startDate, endDate) {
  const startFormatted = convertToRequiredFormat(startDate);
  const endFormatted = convertToRequiredFormat(endDate);
  
  // Create the filter string: Created_Time:between:startDate,endDate
  const filterString = `Created_Time:between:${startFormatted},${endFormatted}`;
  
  // URL encode the entire filter string
  return encodeURIComponent(filterString);
}

export async function POST(request) {
  try {


    const accessToken = await getRefreshToken();

    if (!accessToken) {
      throw new Error('Access token not received');
    }


    const body = await request.json();


    // Convert date range to URL-encoded filter format
    let dateRangeFilter = '';
    if (body.dateRange && body.dateRange.startDate && body.dateRange.endDate) {
      dateRangeFilter = createDateRangeFilter(body.dateRange.startDate, body.dateRange.endDate);
    }



    // Build URL with date range filter if provided
    const contactsUrl = `https://www.zohoapis.in/crm/v8/Contacts/search?criteria=${dateRangeFilter}`;
    
    const leadsUrl = `https://www.zohoapis.in/crm/v8/Leads/search?criteria=${dateRangeFilter}`;



    const contactsResponse = await fetch(contactsUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Zoho-oauthtoken ${accessToken}`,
        'Cookie': '_zcsr_tmp=2c457748-76e7-4104-8147-6df9dccc1b0b; crmcsr=2c457748-76e7-4104-8147-6df9dccc1b0b'
      }
    });
    const leadsResponse = await fetch(leadsUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Zoho-oauthtoken ${accessToken}`,
        'Cookie': '_zcsr_tmp=2c457748-76e7-4104-8147-6df9dccc1b0b; crmcsr=2c457748-76e7-4104-8147-6df9dccc1b0b'
      }
    });

    if (!contactsResponse.ok) {
        let error = await contactsResponse.json();
        console.log(error, "error");
      throw new Error(`Contacts API failed: ${contactsResponse}`);
    }
    if (!leadsResponse.ok) {
      throw new Error(`Leads API failed: ${leadsResponse.status}`);
    }

    let contactsData ;
    try {
      contactsData = await contactsResponse.json();

      if(body.city) {
        contactsData.data = contactsData?.data.filter(item => item.City === body.city);
      }
      if(body.executive) {
        contactsData.data = contactsData?.data.filter(item => item.Field_Executive === body.executive);
      }
      if(body.status) {
        contactsData.data = contactsData?.data.filter(item => item.StatusPrespcription === body.status);
      }
    } catch (error) {
      contactsData = {data: []};
    }
    // console.log(contactsData.data[0], "contactsData");

    contactsData.data = contactsData?.data.map(item => ({
      ...item,
      moduleName: 'Contacts'
    }));

    let leadsData ;
    try {
      leadsData = await leadsResponse.json();
      if(body.city) {
        leadsData.data = leadsData?.data.filter(item => item.City === body.city);
      }
      if(body.executive) {
        leadsData.data = leadsData?.data.filter(item => item.Field_Executive === body.executive);
      }
      if(body.status) {
        leadsData.data = leadsData?.data.filter(item => item.StatusPrespcription === body.status);
      }
    } catch (error) {
      leadsData = {data: []};
    }

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
