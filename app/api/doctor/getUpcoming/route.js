import { getRefreshToken } from "@/app/utils/getRefreshToken";
import { fetchAllPages } from "@/app/utils/zohoPagination";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const doctorNames = searchParams.get('Name');
      const accessToken = await getRefreshToken();
  
      if (!accessToken) {
        throw new Error('Access token not received');
      }


    const fields = [
      "Last_Name",
      "Age",
      "Mobile",
      "Appointment_Date",
      "Preferred_Time",
      "Doctor_Name"
    ].join(',');
    //   "Appointment_Date": "2025-09-04",
    //   "Preferred_Time": "9:00 AM - 11:00 AM",

    // Fetch all pages of contacts with pagination
    const baseUrl = `https://www.zohoapis.in/crm/v8/Contacts?fields=${fields}`;
    const data = await fetchAllPages(baseUrl, accessToken);

    if (!data?.data || data.data.length === 0) {
      return Response.json({ data: [], message: "No contacts found" });
    }

    if (doctorNames) {
      data.data = data?.data.filter(item => item.Doctor_Name === doctorNames);
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
      return Response.json({ data: [], message: "No contacts with appointment dates found" });
    }

    // Filter future appointments only
    const futureAppointments = contactsWithDates.filter(contact => {
      const appointmentDateTime = parseTimeToDate(contact.Appointment_Date, contact.Preferred_Time);
      return appointmentDateTime > now;
    });

    if (futureAppointments.length === 0) {
      return Response.json({ data: [], message: "No upcoming appointments found" });
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

    return Response.json({
      data: contactData.data,
      message: "Upcoming appointment (closest future appointment)"
    });
  } catch (error) {
    console.error('Error fetching upcoming contacts:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}