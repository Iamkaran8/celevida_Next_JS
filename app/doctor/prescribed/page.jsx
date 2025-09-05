"use client";

import { RecentPatientActivityContainer } from "../../../components/recentPatientActivity/RecentPatientActivityContainer";
import { useSelector } from "react-redux";


export default function prescribed() {
const { prescribed } = useSelector((state) => state.doctor);

const mappedPatients = [...prescribed] // copy so Redux state not mutated
  .sort((a, b) => new Date(b.Created_Time) - new Date(a.Created_Time)) // 🆕 sort by date (new → old)
  .map((p, index) => ({
    id: p.id || index, // fallback in case id missing
    patient_name: p.Last_Name || "Unknown",
    patient_id: `ID:#${p.id}`,
    status: p.StatusPrespcription || "N/A",
    phone_number: p.Mobile || "N/A",
    date: p.Created_Time
      ? new Date(p.Created_Time).toLocaleDateString("en-GB") // format dd/mm/yyyy
      : "N/A",
      moduleName: p.moduleName,
  }));

    return (
        <>
            <div>
                <RecentPatientActivityContainer title="Prescribed Patients" patientsDetails={mappedPatients} />
            </div>
        </>
    )
}