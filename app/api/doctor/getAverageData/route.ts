import { getRefreshToken } from "@/app/utils/getRefreshToken";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const doctorNames = searchParams.get('Name');
    const resLevelData = await getLevelData(doctorNames);
    const resHcpData = await getHcpData(doctorNames);
    const resPatientLevelData = await getPatientLevelData(doctorNames);
    return Response.json({
        success: true,
        data:{
          total: resLevelData.total,  
          levelData: resLevelData.resLevelData,
          hcpData: resHcpData,
          patientLevelData: resPatientLevelData
        }
    })
  } catch (error) {
    console.error('Error fetching average data:', error);
    return Response.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}



async function getLevelData(doctorNames: string)
{

  const accessToken = await getRefreshToken();
  
  // Helper function to safely parse numeric values
  const safeParseNumber = (value: any) => {
    if (value === null || value === undefined || value === '') return 0;
    const num = Number(value);
    if (isNaN(num) || !isFinite(num)) return 0;
    // Limit extremely large numbers
    if (Math.abs(num) > 1000000) return 0;
    return num;
  }; 

      const fields = [
        "StatusPrespcription",
        "Weight",
        "Body_Weight_kg_Month_1",
        "Body_Weight_kg_Month_2",
        "Body_Weight_kg_Month_3",
        "Metabolism_BMR",
        "Fasting",
        "PPBG",
        "HbA1c",
        "Doctor_Name",
        "Body_Weight_kg"
      ].join(',');

    const ContactsLevelRes = await fetch(`https://www.zohoapis.in/crm/v8/Contacts?fields=${fields}`, {
      method: 'GET',
      headers: {
        'Authorization': `Zoho-oauthtoken ${accessToken}`,
      }
    })
    const LeadsLevelRes = await fetch(`https://www.zohoapis.in/crm/v8/Leads?fields=${fields}`, {
        method: 'GET',
        headers: {
            'Authorization': `Zoho-oauthtoken ${accessToken}`,
        }
    })
  
    const ContactsLevelData = await ContactsLevelRes.json()
    const LeadsLevelData = await LeadsLevelRes.json()
    if (doctorNames) {
      ContactsLevelData.data = ContactsLevelData.data?.filter(item => item.Doctor_Name === doctorNames);
      LeadsLevelData.data = LeadsLevelData.data?.filter(item => item.Doctor_Name === doctorNames);
    }

    const Leveldata = [...(ContactsLevelData.data || []), ...(LeadsLevelData.data || [])];




    // Calculate average weight change
    const calculateAverageWeightChange = (data: any[]) => {
    
      let beforeProgramAvg = data.reduce((acc, item) => acc + safeParseNumber(item?.Body_Weight_kg), 0) / data.length;
      let month3Avg = data.reduce((acc, item) => acc + safeParseNumber(item?.Body_Weight_kg_Month_3), 0) / data.length;
      let percentageChange = 0;
      
      if(beforeProgramAvg === 0 && month3Avg === 0) {
        percentageChange = 0;
      } else if(beforeProgramAvg === 0 && month3Avg !== 0) {
        percentageChange = month3Avg > 0 ? 100 : -100;
      } else if(beforeProgramAvg !== 0) {
        percentageChange = ((month3Avg - beforeProgramAvg) / beforeProgramAvg) * 100;
      }
        
        return percentageChange.toFixed(2);
        

 
    };

    const resLevelData = {
        patientContinued: ContactsLevelData.data?.length || 0,
        aveRageWeight: Leveldata.length > 0 ? Number(Leveldata.reduce((acc, item) => acc + safeParseNumber(item?.Body_Weight_kg), 0) / Leveldata.length).toFixed(2) : "0.00",
        aveRageWeightChange: calculateAverageWeightChange(Leveldata),
        aveRageBMR: Leveldata.length > 0 ? Number(Leveldata.reduce((acc, item) => acc + safeParseNumber(item?.Metabolism_BMR), 0) / Leveldata.length).toFixed(2) : "0.00",
        aveRageFBS: Leveldata.length > 0 ? Number(Leveldata.reduce((acc, item) => acc + safeParseNumber(item?.Fasting), 0) / Leveldata.length).toFixed(2) : "0.00",
        aveRagePPBS: Leveldata.length > 0 ? Number(Leveldata.reduce((acc, item) => acc + safeParseNumber(item?.PPBG), 0) / Leveldata.length).toFixed(2) : "0.00",
        aveRageHbA1c: Leveldata.length > 0 ? Number(Leveldata.reduce((acc, item) => acc + safeParseNumber(item?.HbA1c), 0) / Leveldata.length).toFixed(2) : "0.00"
    };







    console.log(resLevelData, "resLevelData")

    return{ resLevelData: resLevelData,total: Leveldata.length};

}


async function getHcpData(doctorNames: string)
{

  const accessToken = await getRefreshToken();
  
  // Helper function to safely parse numeric values
  const safeParseNumber = (value: any) => {
    if (value === null || value === undefined || value === '') return 0;
    const num = Number(value);
    if (isNaN(num) || !isFinite(num)) return 0;
    // Limit extremely large numbers
    if (Math.abs(num) > 1000000) return 0;
    return num;
  };
  const fields = [
   "hour_dietary_recall_calorie_intake",
   "How_many_days_do_you_exercise_in_a_week",
   "Quality_hours_of_sleep_do_you_get_at_night",
   "BMI",
   "Body_Fat",
   "Muscle_Mass",
   "Body_Water",
   "Bone_Mass_Kg",
   "hour_dietary_recall_calorie_intake",
   "hour_dietary_recall_carb_intake",
   "hour_dietary_recall_protein_intake",
   "Quality_hours_of_sleep_do_you_get_at_night",
   "Usage_frequency_Month_1",
   "How_many_litres_of_water_do_you_drink_in_a_day",
   "Doctor_Name"
  ].join(',');

  const ContactsHcpRes = await fetch(`https://www.zohoapis.in/crm/v8/Contacts?fields=${fields}`, {
    method: 'GET',
    headers: {
      'Authorization': `Zoho-oauthtoken ${accessToken}`,
    }
  })
  
  const LeadsHcpRes = await fetch(`https://www.zohoapis.in/crm/v8/Leads?fields=${fields}`, {
    method: 'GET',
    headers: {
      'Authorization': `Zoho-oauthtoken ${accessToken}`,
    }
  })
  
  const ContactsHcpData = await ContactsHcpRes.json()
  const LeadsHcpData = await LeadsHcpRes.json()
  
  let HcpData = [...(ContactsHcpData.data || []), ...(LeadsHcpData.data || [])];
  if (doctorNames) {
    HcpData = HcpData?.filter(item => item.Doctor_Name === doctorNames);
  }
  
  const resHcpData = {
    "hour_dietary_recall_calorie_intake": HcpData.length > 0 ? Number(HcpData.reduce((acc, item) => acc + safeParseNumber(item?.hour_dietary_recall_calorie_intake), 0) / HcpData.length).toFixed(2) : "0.00",
    "How_many_days_do_you_exercise_in_a_week": HcpData.length > 0 ? Number(HcpData.reduce((acc, item) => acc + safeParseNumber(item?.How_many_days_do_you_exercise_in_a_week), 0) / HcpData.length).toFixed(2) : "0.00",
    "Quality_hours_of_sleep_do_you_get_at_night": HcpData.length > 0 ? Number(HcpData.reduce((acc, item) => acc + safeParseNumber(item?.Quality_hours_of_sleep_do_you_get_at_night), 0) / HcpData.length).toFixed(2) : "0.00",
    "BMI": HcpData.length > 0 ? Number(HcpData.reduce((acc, item) => acc + safeParseNumber(item?.BMI), 0) / HcpData.length).toFixed(2) : "0.00",
    "Body_Fat": HcpData.length > 0 ? Number(HcpData.reduce((acc, item) => acc + safeParseNumber(item?.Body_Fat), 0) / HcpData.length).toFixed(2) : "0.00",
    "Muscle_Mass": HcpData.length > 0 ? Number(HcpData.reduce((acc, item) => acc + safeParseNumber(item?.Muscle_Mass), 0) / HcpData.length).toFixed(2) : "0.00",
    "Body_Water": HcpData.length > 0 ? Number(HcpData.reduce((acc, item) => acc + safeParseNumber(item?.Body_Water), 0) / HcpData.length).toFixed(2) : "0.00",
    "Bone_Mass_Kg": HcpData.length > 0 ? Number(HcpData.reduce((acc, item) => acc + safeParseNumber(item?.Bone_Mass_Kg), 0) / HcpData.length).toFixed(2) : "0.00",
    "hour_dietary_recall_carb_intake": HcpData.length > 0 ? Number(HcpData.reduce((acc, item) => acc + safeParseNumber(item?.hour_dietary_recall_carb_intake), 0) / HcpData.length).toFixed(2) : "0.00",
    "hour_dietary_recall_protein_intake": HcpData.length > 0 ? Number(HcpData.reduce((acc, item) => acc + safeParseNumber(item?.hour_dietary_recall_protein_intake), 0) / HcpData.length).toFixed(2) : "0.00",
    "Usage_frequency_Month_1": HcpData.length > 0 ? Number(HcpData.reduce((acc, item) => acc + safeParseNumber(item?.Usage_frequency_Month_1), 0) / HcpData.length).toFixed(2) : "0.00",
    "How_many_litres_of_water_do_you_drink_in_a_day": HcpData.length > 0 ? Number(HcpData.reduce((acc, item) => acc + safeParseNumber(item?.How_many_litres_of_water_do_you_drink_in_a_day), 0) / HcpData.length).toFixed(2) : "0.00"
  }

  console.log(resHcpData, "resHcpData")

  return resHcpData;

}



async function getPatientLevelData(doctorNames: string)
{
  const accessToken = await getRefreshToken();
  
  // Helper function to safely parse numeric values
  const safeParseNumber = (value: any) => {
    if (value === null || value === undefined || value === '') return 0;
    const num = Number(value);
    if (isNaN(num) || !isFinite(num)) return 0;
    // Limit extremely large numbers
    if (Math.abs(num) > 1000000) return 0;
    return num;
  };

  // All fields needed
  const allFields = [
    "Weight",
    "Body_Weight_kg_Month_1",
    "Body_Weight_kg_Month_2",
    "Body_Weight_kg_Month_3",
    "BMI",
    "BMI_Month_1",
    "BMI_Month_2",
    "BMI_Month_3",
    "FBG_Month_1",
    "FBG_Month_2",
    "FBG_Month_3",
    "PPBG",
    "PPBG_Month_1",
    "PPBG_Month_2",
    "PPBG_Month_3",
    "HbA1c",
    "HbA1c_Month_1",
    "HbA1c_Month_2",
    "HbA1c_Month_3",
    "hour_dietary_recall_calorie_intake",
    "hour_dietary_recall_calorie_intake_Month_1",
    "hour_dietary_recall_calorie_intake_Month_2",
    "hour_dietary_recall_calorie_intake_Month_3",
    "hour_dietary_recall_carb_intake",
    "hour_dietary_recall_carb_intake_Month_1",
    "hour_dietary_recall_carb_intake_Month_2",
    "hour_dietary_recall_carb_intake_Month_3",
    "hour_dietary_recall_protein_intake",
    "hour_dietary_recall_protein_intake_Month_1",
    "hour_dietary_recall_protein_intake_Month_2",
    "hour_dietary_recall_protein_intake_Month_3",
    "Time_of_Consumption",
    "Time_of_Consumption_Month1",
    "Time_of_Consumption_Month2",
    "Time_of_Consumption_Month3",
    "Usage_frequency_Month_1",
    "Usage_frequency_Month_2",
    "Usage_frequency_Month_3",
    "Quality_hours_of_sleep_do_you_get_at_night",
    "Quality_hours_of_sleep_do_you_get_at_night_Month_1",
    "Quality_hours_of_sleep_do_you_get_at_night_Month_2",
    "Quality_hours_of_sleep_do_you_get_at_night_Month_3",
    "How_many_litres_of_water_do_you_drink_in_a_day",
    "How_many_litres_of_water_do_you_drink_in_a_day_1",
    "How_many_litres_of_water_do_you_drink_in_a_day_2",
    "How_many_litres_of_water_do_you_drink_in_a_day_3",
    "How_many_days_do_you_exercise_in_a_week",
    "How_many_days_do_you_exercise_in_a_week_month1",
    "How_many_days_do_you_exercise_in_a_week_month2",
    "How_many_days_do_you_exercise_in_a_week_month3",
    "Doctor_Name"
  ];

  // Split fields into chunks of 50
  const chunk1 = allFields.slice(0, 50);
  const chunk2 = allFields.slice(50);

  // Function to make API calls for both contacts and leads
  const makeApiCalls = async (fields: string[]) => {
    const fieldsString = fields.join(',');
    
    const [contactsRes, leadsRes] = await Promise.all([
      fetch(`https://www.zohoapis.in/crm/v8/Contacts?fields=${fieldsString}`, {
        method: 'GET',
        headers: {
          'Authorization': `Zoho-oauthtoken ${accessToken}`,
        }
      }),
      fetch(`https://www.zohoapis.in/crm/v8/Leads?fields=${fieldsString}`, {
        method: 'GET',
        headers: {
          'Authorization': `Zoho-oauthtoken ${accessToken}`,
        }
      })
    ]);

    const [contactsData, leadsData] = await Promise.all([
      contactsRes.json(),
      leadsRes.json()
    ]);

    if (doctorNames) {
      contactsData.data = contactsData.data?.filter(item => item.Doctor_Name === doctorNames);
      leadsData.data = leadsData.data?.filter(item => item.Doctor_Name === doctorNames);
    }

      return [...(contactsData.data || []), ...(leadsData.data || [])];
  };

  // Make parallel API calls for both chunks
  const [chunk1Data, chunk2Data] = await Promise.all([
    makeApiCalls(chunk1),
    makeApiCalls(chunk2)
  ]);

  // Merge data from both chunks by ID
  const mergedData: any[] = [];
  const dataMap = new Map();

  // Process chunk1 data
  chunk1Data.forEach(item => {
    if (item.id) {
      dataMap.set(item.id, { ...item });
    }
  });

  // Merge chunk2 data
  chunk2Data.forEach(item => {
    if (item.id) {
      if (dataMap.has(item.id)) {
        dataMap.set(item.id, { ...dataMap.get(item.id), ...item });
      } else {
        dataMap.set(item.id, { ...item });
      }
    }
  });

  // Convert map back to array
  const combinedData = Array.from(dataMap.values());
  

  // Calculate averages for each metric category
  const calculateAverages = (data: any[], fields: string[]) => {
    return fields.map(field => {
      const values = data.map(item => safeParseNumber(item[field])).filter(val => val > 0);
      const average = values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0;
      return Number(average.toFixed(2));
    });
  };

  // Structure the response according to the specified format
  const result = {
    "Body Weight (kg)": calculateAverages(combinedData, [
      "Weight",
      "Body_Weight_kg_Month_1",
      "Body_Weight_kg_Month_2",
      "Body_Weight_kg_Month_3"
    ]),
    "BMI (Body Mass Index)": calculateAverages(combinedData, [
      "BMI",
      "BMI_Month_1",
      "BMI_Month_2",
      "BMI_Month_3"
    ]),
    "FBG": calculateAverages(combinedData, [
      "FBG_Month_1",
      "FBG_Month_2",
      "FBG_Month_3"
    ]),
    "PPBG": calculateAverages(combinedData, [
      "PPBG",
      "PPBG_Month_1",
      "PPBG_Month_2",
      "PPBG_Month_3"
    ]),
    "HbA1c": calculateAverages(combinedData, [
      "HbA1c",
      "HbA1c_Month_1",
      "HbA1c_Month_2",
      "HbA1c_Month_3"
    ]),
    "Calorie intake": calculateAverages(combinedData, [
      "hour_dietary_recall_calorie_intake",
      "hour_dietary_recall_calorie_intake_Month_1",
      "hour_dietary_recall_calorie_intake_Month_2",
      "hour_dietary_recall_calorie_intake_Month_3"
    ]),
    "Carb intake": calculateAverages(combinedData, [
      "hour_dietary_recall_carb_intake",
      "hour_dietary_recall_carb_intake_Month_1",
      "hour_dietary_recall_carb_intake_Month_2",
      "hour_dietary_recall_carb_intake_Month_3"
    ]),
    "Protein intake": calculateAverages(combinedData, [
      "hour_dietary_recall_protein_intake",
      "hour_dietary_recall_protein_intake_Month_1",
      "hour_dietary_recall_protein_intake_Month_2",
      "hour_dietary_recall_protein_intake_Month_3"
    ]),
    "Celevida Consumption": calculateAverages(combinedData, [
      "Time_of_Consumption",
      "Time_of_Consumption_Month1",
      "Time_of_Consumption_Month2",
      "Time_of_Consumption_Month3"
    ]),
    "Usage frequency": calculateAverages(combinedData, [
      "Usage_frequency_Month_1",
      "Usage_frequency_Month_2",
      "Usage_frequency_Month_3"
    ]),
    "Sleep Pattern": calculateAverages(combinedData, [
      "Quality_hours_of_sleep_do_you_get_at_night",
      "Quality_hours_of_sleep_do_you_get_at_night_Month_1",
      "Quality_hours_of_sleep_do_you_get_at_night_Month_2",
      "Quality_hours_of_sleep_do_you_get_at_night_Month_3"
    ]),
    "Water Consumption": calculateAverages(combinedData, [
      "How_many_litres_of_water_do_you_drink_in_a_day",
      "How_many_litres_of_water_do_you_drink_in_a_day_1",
      "How_many_litres_of_water_do_you_drink_in_a_day_2",
      "How_many_litres_of_water_do_you_drink_in_a_day_3"
    ]),
    "Exercise frequency": calculateAverages(combinedData, [
      "How_many_days_do_you_exercise_in_a_week",
      "How_many_days_do_you_exercise_in_a_week_month1",
      "How_many_days_do_you_exercise_in_a_week_month2",
      "How_many_days_do_you_exercise_in_a_week_month3"
    ]),

    contactData: combinedData,

  };

  return result;
}
