"use client";

import { PatientStatusDetails } from "../../../components/patientStatus/PatientStatusDetails";
import styles from '../../../styles/dashboard/page.module.css'
import { UpcommingPatient } from "../../../components/upcommingPatient/UpcommingPatient";
import { PatientSegmentation } from "../../../components/patientSegmentation/PatientSegmentation";
import { RecentPatientActivityContainer } from "../../../components/recentPatientActivity/RecentPatientActivityContainer";
import { Header } from "../../../components/header/Header";
import { useSelector } from "react-redux";





export default function Dashboard() {

    const { onboarded_Patients, prescribed, nurture } = useSelector((state) => state.doctor)
    const mappedPatients = [...onboarded_Patients]
        .sort((a, b) => new Date(b.Created_Time) - new Date(a.Created_Time))
        .map((p, index) => ({
            id: p.id,
            patient_name: p.Last_Name || "Unknown",
            patient_id: `ID:#${p.id}`,
            status: p.StatusPrespcription || "N/A",
            phone_number: p.Mobile || "N/A",
            date: p.Created_Time
                ? new Date(p.Created_Time).toLocaleDateString("en-GB")
                : "N/A",
            moduleName: p.moduleName,
        }));



    return (
        <div>
            <div>
                <Header title="Brand Team" />
            </div>
            <div className={styles.patient_container}>
                <PatientStatusDetails title="Onboarded Patients" logo="/images/onboardedpatients.svg" color="#1B2559" count={onboarded_Patients.length} navigate="brandteam/onboarded" />
                <PatientStatusDetails title="Prescribed" logo="/images/Prescribed.svg" color="#23B883" count={prescribed.length} navigate="brandteam/prescribed" />
                <PatientStatusDetails title="Nurture Patients" logo="/images/Nurture.svg" color="#4085F3" count={nurture.length} navigate="brandteam/nurture" />
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

                <RecentPatientActivityContainer
                    title="Recent Patient Activity"
                    patientsDetails={mappedPatients}
                />

            </div>
        </div>
    );
}
