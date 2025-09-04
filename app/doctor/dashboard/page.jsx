"use client";

import { PatientStatusDetails } from "@/components/patientStatus/PatientStatusDetails";
import styles from '../../../styles/dashboard/page.module.css'
import { UpcommingPatient } from "@/components/upcommingPatient/UpcommingPatient";
import { PatientSegmentation } from "@/components/patientSegmentation/PatientSegmentation";
import { RecentPatientActivityContainer } from "@/components/recentPatientActivity/RecentPatientActivityContainer";
import { Header } from "@/components/header/Header";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";






export default function Dashboard() {

  const { onboarded_Patients, prescribed, nurture } = useSelector((state) => state.doctor);

  const mappedPatients = [...onboarded_Patients]
    .sort((a, b) => new Date(b.Created_Time) - new Date(a.Created_Time))
    .map((p) => ({
      id: p.id,
      patient_name: p.Last_Name || "Unknown",
      patient_id: `ID:#${p.id}`,
      status: p.StatusPrespcription || "N/A",
      phone_number: p.Mobile || "N/A",
      age: p.Age || "N/A",
      gender: p.Gender || "N/A",
      weight: p.weight || "N/A",
      height: p.weight || "N/A",
      date: p.Created_Time
        ? new Date(p.Created_Time).toLocaleDateString("en-GB")
        : "N/A",
      moduleName: p.moduleName,
    }));

  const router = useRouter();
  const handleNavigate = () => {
    router.push(`/doctor/avg`);
  };


  return (
    <div>
      <div>
        <Header title="Welcome Doctor" />
      </div>
      <div className={styles.patient_container}>
        <PatientStatusDetails title="Onboarded Patients" logo="/images/onboardedpatients.svg" color="#1B2559" count={onboarded_Patients.length} navigate="doctor/onboarded" />
        <PatientStatusDetails title="Prescribed" logo="/images/Prescribed.svg" color="#23B883" count={prescribed.length} navigate="doctor/prescribed" />
        <PatientStatusDetails title="Nurture Patients" logo="/images/Nurture.svg" color="#4085F3" count={nurture.length} navigate="doctor/nurture" />
      </div>
      <div className={styles.second_section}>
        <div className={styles.second_section_left}>
          <PatientSegmentation />
        </div>
        <div className={styles.second_section_right}>
          <UpcommingPatient />
        </div>
      </div>

      <div className={styles.avg_btn}>
        {/* <Link href='/docotor/avarageMetrics' className={styles.avg_button}>View Average Metrics</Link> */}
        <button onClick={() => { handleNavigate() }} className={styles.avg_button}>
          View Average Metrics
        </button>
      </div>
      <div>
        {/* <RecentPatientActivityContainer title="Recent Patient Activity" patient_Details={patient_Details} patientsDetails={<PatientActivityCard />} /> */}
        <RecentPatientActivityContainer
          title="Recent Patient Activity"
          patientsDetails={mappedPatients}
        />
      </div>
    </div>
  );
}
