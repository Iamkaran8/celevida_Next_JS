import { getRefreshToken } from "@/app/utils/getRefreshToken";




export async function GET(request) {
    const accessToken = await getRefreshToken();
    try {
    const response = await fetch(`https://www.zohoapis.in/crm/v8/celevidaAccount/search?criteria=((role:equals:Doctor))`, {
        method: 'GET',
        headers: {
            'Authorization': `Zoho-oauthtoken ${accessToken}`,
        },
    });
    try {
    const data = await response.json();
    const doctors = data.data.map((doctor) => ({
      doctor: doctor.Name
    }));

    const doctorNames = doctors.map((doctor) => doctor.doctor);

    return Response.json({ success: true, doctorNames });
    } catch (error) {
        console.error('Error fetching CRM data:', error);
        return Response.json({
            success: false,
            error: 'Invalid credentials'
        }, { status: 500 });
    }

    } catch (error) {
        console.error('Error fetching CRM data:', error);
        return Response.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}