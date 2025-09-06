"use client";

export default function TopCitiesTable() {
  const cities = [
    { rank: 1, name: "Chennai", clinics: 120 },
    { rank: 2, name: "Bangalore", clinics: 95 },
    { rank: 3, name: "Hyderabad", clinics: 80 },
    { rank: 4, name: "Delhi", clinics: 60 },
    { rank: 5, name: "Mumbai", clinics: 50 },
  ];

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
        Top Clinics / Cities Covered
      </h3>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f9fafb", textAlign: "left" }}>
            <th style={{ padding: "10px", fontSize: "14px" }}>Rank</th>
            <th style={{ padding: "10px", fontSize: "14px" }}>City</th>
            <th style={{ padding: "10px", fontSize: "14px" }}>Clinics Covered</th>
          </tr>
        </thead>
        <tbody>
          {cities.map((city) => (
            <tr key={city.rank} style={{ borderTop: "1px solid #f3f4f6" }}>
              <td style={{ padding: "10px", fontSize: "14px" }}>{city.rank}</td>
              <td style={{ padding: "10px", fontSize: "14px" }}>{city.name}</td>
              <td style={{ padding: "10px", fontSize: "14px", fontWeight: "600" }}>
                {city.clinics}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
