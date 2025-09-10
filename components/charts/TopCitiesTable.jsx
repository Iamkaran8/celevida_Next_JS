'use client';
import { useSelector } from "react-redux";

export default function TopCitiesTable() {
  const { cities } = useSelector(state => state.superadmin);

  return (
    <div
      style={{
        background: "white",
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
      }}
    >
      <h3
        style={{
          fontSize: "16px",
          fontWeight: "600",
          marginBottom: "16px",
        }}
      >
        Top Cities / Clinics Covered
      </h3>

      <div style={{ maxHeight: "300px", overflowY: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f9fafb", textAlign: "left" }}>
              <th style={{ padding: "10px", fontSize: "14px" }}>Rank</th>
              <th style={{ padding: "10px", fontSize: "14px" }}>City</th>
              <th style={{ padding: "10px", fontSize: "14px" }}> Count</th>
            </tr>
          </thead>
          <tbody>
            {cities.map((city, index) => (
              <tr key={city.cityname} style={{ borderTop: "1px solid #f3f4f6" }}>
                <td style={{ padding: "10px", fontSize: "14px" }}>{index + 1}</td>
                <td style={{ padding: "10px", fontSize: "14px" }}>{city.cityname}</td>
                <td style={{ padding: "10px", fontSize: "14px", fontWeight: "600" }}>
                  {city.count}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
