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

    console.log(data.info, "data", baseUrl);

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

// Helper function to normalize strings for case-insensitive comparison (lowercase + remove spaces)
function normalizeString(str) {
  if (!str) return '';
  return str.toString().toLowerCase().replace(/\s+/g, '');
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

      if (body.cities && body.cities.length > 0) {
        contactsData.data = contactsData?.data.filter(item => body.cities.includes(item.City));
      }
      if (body.executives && body.executives.length > 0) {
        const normalizedExecutives = body.executives.map(exec => normalizeString(exec));
        contactsData.data = contactsData?.data.filter(item =>
          normalizedExecutives.includes(normalizeString(item.Field_Executive))
        );
      }
      if (body.doctors && body.doctors.length > 0) {
        console.log('Filtering contacts by doctors:', body.doctors);
        console.log('Sample Doctor_Name values:', contactsData.data.slice(0, 5).map(item => item.Doctor_Name));
        const normalizedDoctors = body.doctors.map(doc => normalizeString(doc));
        contactsData.data = contactsData?.data.filter(item =>
          item.Doctor_Name && normalizedDoctors.includes(normalizeString(item.Doctor_Name))
        );
        console.log('Filtered contacts count:', contactsData.data.length);
      }
      if (body.statuses && body.statuses.length > 0) {
        contactsData.data = contactsData?.data.filter(item => body.statuses.includes(item.StatusPrespcription));
      }
    } catch (error) {
      contactsData = { data: [] };
    }
    // //console.log(contactsData.data[0], "contactsData");

    contactsData.data = contactsData?.data.map(item => ({
      ...item,
      moduleName: 'Contacts'
    }));

    try {
      leadsData = await fetchAllPages(leadsUrl, accessToken);
      if (body.cities && body.cities.length > 0) {
        leadsData.data = leadsData?.data.filter(item => body.cities.includes(item.City));
      }
      if (body.executives && body.executives.length > 0) {
        const normalizedExecutives = body.executives.map(exec => normalizeString(exec));
        leadsData.data = leadsData?.data.filter(item =>
          normalizedExecutives.includes(normalizeString(item.Field_Executive))
        );
      }
      if (body.doctors && body.doctors.length > 0) {
        console.log('Filtering leads by doctors:', body.doctors);
        console.log('Sample Doctor_Name values:', leadsData.data.slice(0, 5).map(item => item.Doctor_Name));
        const normalizedDoctors = body.doctors.map(doc => normalizeString(doc));
        leadsData.data = leadsData?.data.filter(item =>
          item.Doctor_Name && normalizedDoctors.includes(normalizeString(item.Doctor_Name))
        );
        console.log('Filtered leads count:', leadsData.data.length);
      }
      if (body.statuses && body.statuses.length > 0) {
        leadsData.data = leadsData?.data.filter(item => body.statuses.includes(item.StatusPrespcription));
      }
    } catch (error) {
      leadsData = { data: [] };
    }

    leadsData.data = leadsData?.data.map(item => ({
      ...item,
      moduleName: 'Leads'
    }));



    let allData = [
      ...contactsData?.data
    ];


    // Define all parameters with their month variants
    const parameters = [
      'HbA1c',
      'BMI',
      'Body_Weight_kg',
      'Fasting',
      'PPBG',
      'Visceral_Fat_Level',
      'Muscle_Mass',
      'Muscle_Weight',
      'Bone_Mass_Kg',
      'Body_Fat',
      'Muscle',
      'hour_dietary_recall_calorie_intake',
      'hour_dietary_recall_carb_intake',
      'hour_dietary_recall_protein_intake',
      'Fiber_Intake'
    ];

    // Function to safely get numeric value with null check
    function getNumericValue(value) {
      if (value === null || value === undefined || value === '' || isNaN(value)) {
        return 0;
      }
      return parseFloat(value) || 0;
    }

    const getParametrName = (parameter) => {
      switch (parameter) {
        case 'Fasting': return 'FBG';
        default: return parameter;
      }
    }

    // Function to calculate parameter statistics
    function calculateParameterStats(parameter, data) {
      // Calculate Before Program Average
      const beforeValues = data.map(item => getNumericValue(item[parameter])).filter(val => val !== 0);
      const beforeProgramAvg = beforeValues.length > 0 ?
        beforeValues.reduce((sum, val) => sum + val, 0) / beforeValues.length : 0;

      // Calculate Month 1, 2 & 3 Average
      //console.log(parameter, "parameter");
      const month1Values = data.map(item => getNumericValue(item[`${getParametrName(parameter)}_Month_1`])).filter(val => val !== 0);
      //console.log(month1Values, "data month1");
      const month2Values = data.map(item => getNumericValue(item[`${getParametrName(parameter)}_Month_2`])).filter(val => val !== 0);
      //console.log(month2Values, "data month2");
      const month3Values = data.map(item => getNumericValue(item[`${getParametrName(parameter)}_Month_3`])).filter(val => val !== 0);
      //console.log(month3Values, "data month3");

      const month1Avg = month1Values.length > 0 ?



        month1Values.reduce((sum, val) => sum + val, 0) / month1Values.length : 0;
      const month2Avg = month2Values.length > 0 ?
        month2Values.reduce((sum, val) => sum + val, 0) / month2Values.length : 0;
      const month3Avg = month3Values.length > 0 ?
        month3Values.reduce((sum, val) => sum + val, 0) / month3Values.length : 0;

      // Calculate combined months average
      const monthlyValues = [...month1Values, ...month2Values, ...month3Values];
      const monthsAvg = monthlyValues.length > 0 ?
        monthlyValues.reduce((sum, val) => sum + val, 0) / monthlyValues.length : 0;

      // Calculate percentage change
      let percentageChange = 0;
      if (beforeProgramAvg === 0 && month3Avg === 0) {
        // Both are 0, percentage change is 0
        percentageChange = 0;
      } else if (beforeProgramAvg === 0 && month3Avg !== 0) {
        // Started from 0, treat as 100% increase if month3 is positive
        percentageChange = month3Avg > 0 ? 100 : -100;
      } else if (beforeProgramAvg !== 0) {
        // Normal calculation when beforeProgramAvg is not 0
        percentageChange = ((month3Avg - beforeProgramAvg) / beforeProgramAvg) * 100;
      }

      return {
        parameter: parameter,
        beforeProgramAvg: parseFloat(beforeProgramAvg.toFixed(2)),
        month1Avg: parseFloat(month1Avg.toFixed(2)),
        month2Avg: parseFloat(month2Avg.toFixed(2)),
        month3Avg: parseFloat(month3Avg.toFixed(2)),
        monthsAvg: parseFloat(monthsAvg.toFixed(2)),
        percentageChange: parseFloat(percentageChange.toFixed(2))
      };
    }

    // Calculate statistics for all parameters
    const tableData = parameters.map(parameter => calculateParameterStats(parameter, allData));






    // Return the contacts data and table statistics
    return Response.json({
      success: true,
      tableData: tableData,
      data: allData
    });

  } catch (error) {
    console.error('Error fetching CRM data:', error);
    return Response.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
