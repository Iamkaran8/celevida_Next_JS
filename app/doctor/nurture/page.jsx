"use client";

import { RecentPatientActivityContainer } from "@/components/recentPatientActivity/RecentPatientActivityContainer";
import { useSelector } from "react-redux";

// export const patient_Details = [
//     { id: 1, patient_name: "Nimi Martins", patient_id: "ID:#Nim89282", status: "Prescribed", phone_number: "+91 7837738029", date: "12/08/2025" },
//     { id: 2, patient_name: "John Doe", patient_id: "ID:#JD12345", status: "Pending", phone_number: "+91 9876543210", date: "14/08/2025" },
//     { id: 3, patient_name: "Jane Smith", patient_id: "ID:#JS67890", status: "Prescribed", phone_number: "+91 9988776655", date: "15/08/2025" },
//     { id: 4, patient_name: "Mark Johnson", patient_id: "ID:#MJ24680", status: "Pending", phone_number: "+91 7788996655", date: "16/08/2025" },
//     { id: 5, patient_name: "Emma Brown", patient_id: "ID:#EB54321", status: "Prescribed", phone_number: "+91 6677889900", date: "17/08/2025" },
//     { id: 6, patient_name: "Chris Lee", patient_id: "ID:#CL11223", status: "Prescribed", phone_number: "+91 8899776655", date: "18/08/2025" },
//     { id: 7, patient_name: "Sophia Wilson", patient_id: "ID:#SW33445", status: "Pending", phone_number: "+91 7766554433", date: "19/08/2025" },
// ];


export default function Nurture() {
const { nurture } = useSelector((state) => state.doctor);

const mappedPatients = [...nurture] // copy so original state not mutated
  .sort((a, b) => new Date(b.Created_Time) - new Date(a.Created_Time)) // 🆕 sort by date DESC
  .map((p, index) => ({
    id: p.id || index, // fallback in case id missing
    patient_name: p.Last_Name || "Unknown",
    patient_id: `ID:#${p.id}`,
    status: p.StatusPrespcription || "N/A",
    phone_number: p.Mobile || "N/A",
    date: p.Created_Time
      ? new Date(p.Created_Time).toLocaleDateString("en-GB") // format dd/mm/yyyy
      : "N/A",
  }));

    return (
        <>
            <div>
                <RecentPatientActivityContainer title="Nuture Patients" patientsDetails={mappedPatients} />
            </div>
        </>
    )
}