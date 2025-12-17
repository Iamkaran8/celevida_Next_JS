import { getRefreshToken } from "@/app/utils/getRefreshToken";
import { fetchAllPages } from "@/app/utils/zohoPagination";

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
