import { getRefreshToken } from "@/app/utils/getRefreshToken";




export async function POST(request) {
    const accessToken = await getRefreshToken();
    const { Name, password } = await request.json();
    console.log(Name, password);
    try {
    const response = await fetch(`https://www.zohoapis.in/crm/v8/celevidaAccount/search?criteria=(((Name:equals:${Name})or(Email:equals:${Name}))and(password:equals:${password}))`, {
        method: 'GET',
        headers: {
            'Authorization': `Zoho-oauthtoken ${accessToken}`,
        },
    });
    try {
    const data = await response.json();
    return Response.json({ success: true, data });
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