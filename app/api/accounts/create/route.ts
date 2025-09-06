import { getRefreshToken } from "@/app/utils/getRefreshToken";

export async function POST(request) {
    try {
       const accessToken = await getRefreshToken();
       if (!accessToken) {
        throw new Error('Access token not received');
       }
       const accounts = await request.json();
       const { Name,password, role } = accounts[0];

       if(Name  && password && role) {
        const body = {
            data:accounts
        }
        const response = await fetch(`https://www.zohoapis.in/crm/v8/celevidaAccount`, {
            method: 'POST',
            headers: {
                'Authorization': `Zoho-oauthtoken ${accessToken}`,
            },
            body: JSON.stringify(body),
       });

       const data = await response.json();

       return Response.json({ data });
       }    
       else {
        return Response.json({ error: 'Name, password or role are required' }, { status: 400 });
       }
       
       
    } catch (error) {
        console.error('Error creating account:', error);
        return Response.json({ error: 'Failed to create account' }, { status: 500 });
    }
}