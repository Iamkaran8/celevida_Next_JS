import { getRefreshToken } from "@/app/utils/getRefreshToken";

// Function to fetch all pages of data from Zoho API with pagination
async function fetchAllPages(baseUrl, accessToken) {
  let allData = [];
  let page = 1;
  let hasMoreRecords = true;
  let pageToken = null;
  const perPage = 200; // Maximum allowed by Zoho API

  while (hasMoreRecords) {
    let url;
    
    // For first 2000 records (pages 1-10), use 'page' parameter
    // After 2000 records, use 'page_token' parameter
    if (pageToken) {
      url = `${baseUrl}&per_page=${perPage}&page_token=${pageToken}`;
    } else {
      url = `${baseUrl}&per_page=${perPage}&page=${page}`;
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Zoho-oauthtoken ${accessToken}`,
        'Cookie': '_zcsr_tmp=2c457748-76e7-4104-8147-6df9dccc1b0b; crmcsr=2c457748-76e7-4104-8147-6df9dccc1b0b'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API failed (${response.status}):`, errorText);
      throw new Error(`API failed: ${response.status}`);
    }

    const data = await response.json();

    console.log({
      per_page: data.info?.per_page,
      count: data.info?.count,
      sort_by: data.info?.sort_by,
      page: data.info?.page,
      sort_order: data.info?.sort_order,
      more_records: data.info?.more_records,
      next_page_token: data.info?.next_page_token ? 'present' : 'null',
      using_page_token: pageToken ? true : false
    }, "pagination info");

    // Append current page data to allData
    if (data.data && data.data.length > 0) {
      allData = [...allData, ...data.data];
    }

    // Check if there are more records
    hasMoreRecords = data.info && data.info.more_records === true;
    
    // If we've fetched 2000 records (10 pages) and there are more records,
    // switch to using page_token for subsequent requests
    if (page >= 10 && hasMoreRecords && data.info?.next_page_token) {
      pageToken = data.info.next_page_token;
      console.log('Switching to page_token for records beyond 2000');
    } else if (!pageToken) {
      // Only increment page if we're not using page_token
      page++;
    } else {
      // Update page_token for next iteration
      pageToken = data.info?.next_page_token;
    }
  }

  console.log(`Total records fetched: ${allData.length}`);
  return { data: allData };
}

export async function GET(request) {
  try {
    // Extract the Name parameter from the URL query string
    const { searchParams } = new URL(request.url);
    const doctorNames = searchParams.get('Name');

    const accessToken = await getRefreshToken();

    if (!accessToken) {
      throw new Error('Access token not received');
    }

    // Define fields to fetch
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
      "StatusPrespcription",
      "Doctor_Name"
    ].join(',');

    // Fetch all pages of Contacts and Leads data with pagination
    const contactsBaseUrl = `https://www.zohoapis.in/crm/v8/Contacts?fields=${fields}`;
    const leadsBaseUrl = `https://www.zohoapis.in/crm/v8/Leads?fields=${fields}`;

    const contactsData = await fetchAllPages(contactsBaseUrl, accessToken);
    const leadsData = await fetchAllPages(leadsBaseUrl, accessToken);

    console.log(contactsData.data.length, "contactsData length");
    console.log(leadsData.data.length, "leadsData length");

    // Add module name to each record
    let mappedContactsData = contactsData?.data.map(item => ({
      ...item,
      moduleName: 'Contacts'
    }));

    let mappedLeadsData = leadsData?.data.map(item => ({
      ...item,
      moduleName: 'Leads'
    }));

    // Filter by doctor name if provided
    if (doctorNames) {
      mappedContactsData = mappedContactsData.filter(item => item.Doctor_Name === doctorNames);
      mappedLeadsData = mappedLeadsData.filter(item => item.Doctor_Name === doctorNames);
    }

    const allData = [
      ...mappedContactsData,
      ...mappedLeadsData
    ];

    console.log(allData.length, "allData length (after filtering)");

    // Return the combined data
    return Response.json({
      success: true,
      data: allData,
      totalRecords: allData.length
    });

  } catch (error) {
    console.error('Error fetching CRM data:', error);
    return Response.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
