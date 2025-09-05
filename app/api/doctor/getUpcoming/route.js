import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const tokenResponse = await fetch('https://accounts.zoho.in/oauth/v2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': '_zcsr_tmp=a6fa39ea-832d-4192-9592-6c788b58a835; iamcsr=a6fa39ea-832d-4192-9592-6c788b58a835; zalb_6e73717622=dea4bb29906843a6fbdf3bd5c0e43d1d'
      },
      body: new URLSearchParams({
        'grant_type': 'refresh_token',
        'client_id': '1000.KBTLU1N3JX4IR4JYSNTVJ3U9JFS5GF',
        'client_secret': 'bb4740b298fa601d2fc240bbc23d265d338896d3c5',
        'refresh_token': '1000.e66c4e8523293a4624de5a97f8291285.c4e96c6e52a5f5729bb1c8e71c0cc539'
      })
    });
    console.log(tokenResponse, "tokenResponse");
    if (!tokenResponse.ok) {
      throw new Error(`Token API failed: ${tokenResponse.status}`);
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    if (!accessToken) {
      throw new Error('Access token not received');
    }

    const fields = [
      "Last_Name",
      "Age",
      "Mobile",
      "Appointment_Date",
      "Preferred_Time"
    ].join(',');
    //   "Appointment_Date": "2025-09-04",
    //   "Preferred_Time": "9:00 AM - 11:00 AM",

    const response = await fetch(`https://www.zohoapis.in/crm/v8/Contacts?fields=${fields}`, {
      method: 'GET',
      headers: {
        'Authorization': `Zoho-oauthtoken ${accessToken}`,
      }
    });

    const data = await response.json();

    if (!data?.data || data.data.length === 0) {
      return NextResponse.json({ data: [], message: "No contacts found" });
    }

    // Helper function to parse time string and create full datetime
    const parseTimeToDate = (dateString, timeString) => {
      const appointmentDate = new Date(dateString);

      if (!timeString) {
        // If no time specified, assume start of day
        appointmentDate.setHours(0, 0, 0, 0);
        return appointmentDate;
      }

      // Extract the start time from ranges like "9:00 AM - 11:00 AM"
      const startTime = timeString.split(' - ')[0].trim();
      const [time, period] = startTime.split(' ');
      const [hours, minutes] = time.split(':').map(Number);

      let hour24 = hours;

      // Convert to 24-hour format
      if (period === 'PM' && hours !== 12) {
        hour24 += 12;
      } else if (period === 'AM' && hours === 12) {
        hour24 = 0;
      }

      appointmentDate.setHours(hour24, minutes || 0, 0, 0);
      return appointmentDate;
    };

    // Get current date and time
    const now = new Date();

    // Filter contacts with valid appointment dates
    const contactsWithDates = data.data.filter(contact => contact.Appointment_Date);

    if (contactsWithDates.length === 0) {
      return NextResponse.json({ data: [], message: "No contacts with appointment dates found" });
    }

    // Filter future appointments only
    const futureAppointments = contactsWithDates.filter(contact => {
      const appointmentDateTime = parseTimeToDate(contact.Appointment_Date, contact.Preferred_Time);
      return appointmentDateTime > now;
    });

    if (futureAppointments.length === 0) {
      return NextResponse.json({ data: [], message: "No upcoming appointments found" });
    }

    // Sort by appointment datetime (earliest future appointment first)
    const sortedContacts = futureAppointments.sort((a, b) => {
      const dateTimeA = parseTimeToDate(a.Appointment_Date, a.Preferred_Time);
      const dateTimeB = parseTimeToDate(b.Appointment_Date, b.Preferred_Time);
      return dateTimeA - dateTimeB;
    });

    // Return the upcoming (closest future) contact
    const upcomingContact = sortedContacts[0].id;

    const contactDataResponse = await fetch(`https://www.zohoapis.in/crm/v8/Contacts/${upcomingContact}`, {
      method: 'GET',
      headers: {
        'Authorization': `Zoho-oauthtoken ${accessToken}`,
      }
    });
    const contactData = await contactDataResponse.json();

    return NextResponse.json({
      data: contactData.data,
      message: "Upcoming appointment (closest future appointment)"
    });
  } catch (error) {
    console.error('Error fetching upcoming contacts:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}