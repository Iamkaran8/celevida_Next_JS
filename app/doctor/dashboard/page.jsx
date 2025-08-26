"use client";

import { PatientStatusDetails } from "@/components/patientStatus/PatientStatusDetails";

import styles from '../../../styles/dashboard/page.module.css'
import { UpcommingPatient } from "@/components/upcommingPatient/UpcommingPatient";
import { PatientSegmentation } from "@/components/patientSegmentation/PatientSegmentation";
import { RecentPatientActivityContainer } from "@/components/recentPatientActivity/RecentPatientActivityContainer";
import { Header } from "@/components/header/Header";



export const patient_Details = [
  { id: 1, patient_name: "Nimi Martins", patient_id: "ID:#Nim89282", status: "Prescribed", phone_number: "+91 7837738029", date: "12/08/2025" },
  { id: 2, patient_name: "John Doe", patient_id: "ID:#JD12345", status: "Pending", phone_number: "+91 9876543210", date: "14/08/2025" },
  { id: 3, patient_name: "Jane Smith", patient_id: "ID:#JS67890", status: "Prescribed", phone_number: "+91 9988776655", date: "15/08/2025" },
  { id: 4, patient_name: "Mark Johnson", patient_id: "ID:#MJ24680", status: "Pending", phone_number: "+91 7788996655", date: "16/08/2025" },
  { id: 5, patient_name: "Emma Brown", patient_id: "ID:#EB54321", status: "Prescribed", phone_number: "+91 6677889900", date: "17/08/2025" },
  { id: 6, patient_name: "Chris Lee", patient_id: "ID:#CL11223", status: "Prescribed", phone_number: "+91 8899776655", date: "18/08/2025" },
  { id: 7, patient_name: "Sophia Wilson", patient_id: "ID:#SW33445", status: "Pending", phone_number: "+91 7766554433", date: "19/08/2025" },
];


export default function Dashboard() {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div className={styles.patient_container}>
        <PatientStatusDetails />
        <PatientStatusDetails />
        <PatientStatusDetails />
      </div>
      <div className={styles.second_section}>
        <div className={styles.second_section_left}>
          <PatientSegmentation />
        </div>
        <div className={styles.second_section_right}>
          <UpcommingPatient />
        </div>
      </div>
      <div>
        {/* <RecentPatientActivityContainer title="Recent Patient Activity" patient_Details={patient_Details} patientsDetails={<PatientActivityCard />} /> */}
        <RecentPatientActivityContainer 
  title="Recent Patient Activity" 
  patientsDetails={patient_Details} 
/>

      </div>
    </div>
  );
}
