'use client';
import { useSelector } from "react-redux";

export default function TopCitiesTable() {
  const { cities } = useSelector(state => state.superadmin);

  // Calculate totals - sum all city rows
  const totals = cities.reduce((acc, city) => ({
    totalClinics: acc.totalClinics + (city.totalClinics || 0),
    totalCamps: acc.totalCamps + (city.totalCamps || 0),
    totalContacts: acc.totalContacts + (city.totalContacts || 0),
    totalLeads: acc.totalLeads + (city.totalLeads || 0),
    grandTotal: acc.grandTotal + (city.grandTotal || 0)
  }), {
    totalClinics: 0,
    totalCamps: 0,
    totalContacts: 0,
    totalLeads: 0,
    grandTotal: 0
  });

  return (
    <div
      style={{
        background: "white",
        border: "1px solid #e5e7eb",
        borderRadius: "6px",
        padding: "20px",
        
      }}
    >
      <h3
        style={{
          fontSize: "16px",
          fontWeight: "600",
          marginBottom: "16px",
        }}
      >
        City wise performance
      </h3>

      <div style={{ maxHeight: "400px", overflowY: "auto", overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "800px" }}>
          <thead>
            <tr style={{ background: "#f9fafb", textAlign: "left" }}>
              <th style={{ padding: "10px", fontSize: "14px", fontWeight: "600", position: "sticky", top: 0, background: "#f9fafb", zIndex: 1 }}>Rank</th>
              <th style={{ padding: "10px", fontSize: "14px", fontWeight: "600", position: "sticky", top: 0, background: "#f9fafb", zIndex: 1 }}>City Name</th>
              <th style={{ padding: "10px", fontSize: "14px", fontWeight: "600", position: "sticky", top: 0, background: "#f9fafb", zIndex: 1, textAlign: "center" }}>Total Clinics/HCP Participated</th>
              {/* <th style={{ padding: "10px", fontSize: "14px", fontWeight: "600", position: "sticky", top: 0, background: "#f9fafb", zIndex: 1, textAlign: "center" }}>Total Camps Conducted</th> */}
              <th style={{ padding: "10px", fontSize: "14px", fontWeight: "600", position: "sticky", top: 0, background: "#f9fafb", zIndex: 1, textAlign: "center" }}>Total Patients Onboarded</th>
              <th style={{ padding: "10px", fontSize: "14px", fontWeight: "600", position: "sticky", top: 0, background: "#f9fafb", zIndex: 1, textAlign: "center" }}>Total Patient Nurtured</th>
              <th style={{ padding: "10px", fontSize: "14px", fontWeight: "600", position: "sticky", top: 0, background: "#f9fafb", zIndex: 1, textAlign: "center" }}>Grand Total of Patients</th>
            </tr>
          </thead>
          <tbody>
            {cities.map((city, index) => (
              <tr key={city.cityname} style={{ borderTop: "1px solid #f3f4f6" }}>
                <td style={{ padding: "10px", fontSize: "14px" }}>{index + 1}</td>
                <td style={{ padding: "10px", fontSize: "14px", fontWeight: "500" }}>{city.cityname}</td>
                <td style={{ padding: "10px", fontSize: "14px", textAlign: "center" }}>
                  {city.totalClinics || 0}
                </td>
                {/* <td style={{ padding: "10px", fontSize: "14px", textAlign: "center" }}>
                  {city.totalCamps || 0}
                </td> */}
                <td style={{ padding: "10px", fontSize: "14px", textAlign: "center" }}>
                  {city.totalContacts || 0}
                </td>
                <td style={{ padding: "10px", fontSize: "14px", textAlign: "center" }}>
                  {city.totalLeads || 0}
                </td>
                <td style={{ padding: "10px", fontSize: "14px", fontWeight: "600", textAlign: "center", color: "#059669" }}>
                  {city.grandTotal || 0}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr style={{ borderTop: "2px solid #d1d5db", background: "#f9fafb", fontWeight: "600" }}>
              <td style={{ padding: "12px 10px", fontSize: "14px" }} colSpan="2">Total</td>
              <td style={{ padding: "12px 10px", fontSize: "14px", textAlign: "center", color: "#1f2937" }}>
                {totals.totalClinics}
              </td>
              {/* <td style={{ padding: "12px 10px", fontSize: "14px", textAlign: "center", color: "#1f2937" }}>
                {totals.totalCamps}
              </td> */}
              <td style={{ padding: "12px 10px", fontSize: "14px", textAlign: "center", color: "#1f2937" }}>
                {totals.totalContacts}
              </td>
              <td style={{ padding: "12px 10px", fontSize: "14px", textAlign: "center", color: "#1f2937" }}>
                {totals.totalLeads}
              </td>
              <td style={{ padding: "12px 10px", fontSize: "14px", fontWeight: "700", textAlign: "center", color: "#059669" }}>
                {totals.grandTotal}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
