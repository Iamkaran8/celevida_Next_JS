import { getRefreshToken } from "@/app/utils/getRefreshToken";

// Function to fetch all pages of data from Zoho API
async function fetchAllPages(baseUrl, accessToken) {
  let allData = [];
  let page = 1;
  let hasMoreRecords = true;

  while (hasMoreRecords) {
    const urlWithPage = `${baseUrl}&page=${page}`;
    
    const response = await fetch(urlWithPage, {
      method: 'GET',
      headers: {
        'Authorization': `Zoho-oauthtoken ${accessToken}`,
        'Cookie': '_zcsr_tmp=2c457748-76e7-4104-8147-6df9dccc1b0b; crmcsr=2c457748-76e7-4104-8147-6df9dccc1b0b'
      }
    });

    if (!response.ok) {
      throw new Error(`API failed: ${response.status}`);
    }

    const data = await response.json();

    console.log(data.info, "data",baseUrl);
    
    // Append current page data to allData
    if (data.data && data.data.length > 0) {
      allData = [...allData, ...data.data];
    }

    // Check if there are more records
    hasMoreRecords = data.info && data.info.more_records === true;
    page++;
  }

  return { data: allData };
}

// Function to convert date string to the required format
function convertToRequiredFormat(dateString, isEndDate = false) {
  const date = new Date(dateString);
  
  // Set time based on whether it's start or end date
  if (isEndDate) {
    // End date: set to 23:59:59 (11:59 PM)
    date.setHours(23, 59, 59, 999);
  } else {
    // Start date: set to 00:00:00 (12:00 AM)
    date.setHours(0, 0, 0, 0);
  }
  
  // Get timezone offset in minutes and convert to hours:minutes format
  const timezoneOffset = date.getTimezoneOffset();
  const offsetHours = Math.floor(Math.abs(timezoneOffset) / 60);
  const offsetMinutes = Math.abs(timezoneOffset) % 60;
  const offsetSign = timezoneOffset <= 0 ? '+' : '-';
  const timezoneString = `${offsetSign}${offsetHours.toString().padStart(2, '0')}:${offsetMinutes.toString().padStart(2, '0')}`;
  
  // Get ISO string and replace Z with actual timezone
  const isoString = date.toISOString();
  
  // Replace milliseconds and Z with the actual timezone format
  // From: 2025-08-09T18:30:00.000Z
  // To: 2025-08-09T00:00:00+05:30 (start) or 2025-08-09T23:59:59+05:30 (end)
  const formattedDate = isoString.replace(/\.\d{3}Z$/, timezoneString);
  
  return formattedDate;
}

// Function to create URL-encoded date range filter
function createDateRangeFilter(startDate, endDate) {
  const startFormatted = convertToRequiredFormat(startDate, false); // Start of day (00:00:00)
  const endFormatted = convertToRequiredFormat(endDate, true);      // End of day (23:59:59)
 
  //console.log(startFormatted, "startFormatted");
  //console.log(endFormatted, "endFormatted");
  
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



    // Fetch all pages of data using the pagination helper
    let contactsData;
    let leadsData;

    try {
      contactsData = await fetchAllPages(contactsUrl, accessToken);

      if(body.cities && body.cities.length > 0) {
        contactsData.data = contactsData?.data.filter(item => body.cities.includes(item.City));
      }
      if(body.executives && body.executives.length > 0) {
        contactsData.data = contactsData?.data.filter(item => body.executives.includes(item.Field_Executive));
      }
      if(body.doctors && body.doctors.length > 0) {
        contactsData.data = contactsData?.data.filter(item => body.doctors.includes(item.Doctor_Name));
      }
      if(body.statuses && body.statuses.length > 0) {
        contactsData.data = contactsData?.data.filter(item => body.statuses.includes(item.StatusPrespcription));
      }
    } catch (error) {
      contactsData = {data: []};
    }
    // //console.log(contactsData.data[0], "contactsData");

    contactsData.data = contactsData?.data.map(item => ({
      ...item,
      moduleName: 'Contacts'
    }));

    try {
      leadsData = await fetchAllPages(leadsUrl, accessToken);
      if(body.cities && body.cities.length > 0) {
        leadsData.data = leadsData?.data.filter(item => body.cities.includes(item.City));
      }
      if(body.executives && body.executives.length > 0) {
        leadsData.data = leadsData?.data.filter(item => body.executives.includes(item.Field_Executive));
      }
      if(body.doctors && body.doctors.length > 0) {
        leadsData.data = leadsData?.data.filter(item => body.doctors.includes(item.Doctor_Name));
      }
      if(body.statuses && body.statuses.length > 0) {
        leadsData.data = leadsData?.data.filter(item => body.statuses.includes(item.StatusPrespcription));
      }
    } catch (error) {
      leadsData = {data: []};
    }
    // console.log(leadsData, "leadsData");
    leadsData.data = leadsData?.data.map(item => ({
      ...item,
      moduleName: 'Leads'
    }));

    


      const uniqueDoctorParticipated = [...new Set([...contactsData?.data.map(item => item.Doctor_Name), ...leadsData?.data.map(item => item.Doctor_Name)])];

      const totalDoctorParticipated = uniqueDoctorParticipated.length;

   const allData = [...contactsData?.data, ...leadsData?.data];
   console.log(allData.length, "allData");
   console.log(leadsData?.data.length, "leadsData");
   console.log(contactsData?.data.length, "contactsData");
    // Return the contacts data
    return Response.json({
      success: true,
      data: [
        ...contactsData?.data,
        ...leadsData?.data
      ],
      totalDoctorParticipated:totalDoctorParticipated
    });

  } catch (error) {
    console.error('Error fetching CRM data:', error);
    return Response.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
