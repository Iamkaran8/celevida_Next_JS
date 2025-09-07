"use client";

import { PatientStatusDetails } from "../../../components/patientStatus/PatientStatusDetails";
import styles from '../../../styles/dashboard/page.module.css'
import { UpcommingPatient } from "../../../components/upcommingPatient/UpcommingPatient";
import { PatientSegmentation } from "../../../components/patientSegmentation/PatientSegmentation";
import { RecentPatientActivityContainer } from "../../../components/recentPatientActivity/RecentPatientActivityContainer";
import { Header } from "../../../components/header/Header";
import { useSelector } from "react-redux";
import { Leads } from "../../../components/leadsGraph/Leads";
import { CrmSyncLogs } from "../../../components/crmSyncLogs/CrmSyncLogs";
import { FEActivity } from "../../../components/crmSyncLogs/FEActivity";
import { HCPerformance } from "../../..//components/crmSyncLogs/HCPerformance";
import PatientsKpiCard from "@/components/charts/PatientsKpiCard";
import { GraphOuterContainer } from "@/components/graphoutercontainer/GraphOuterContainer";
import GenderChart from "@/components/charts/GenderChart";
import AgeGroupChart from "@/components/charts/AgeGroupChart";
import PatientFunnelChart from "@/components/charts/PatientFunnelChart";
import RatingDistribution from "@/components/charts/RatingDistribution";
import CallCompletionChart from "@/components/charts/CallCompletionChart";
import CelevidaChart from "@/components/charts/CelevidaChart";
import TopCitiesTable from "@/components/charts/TopCitiesTable";
import { Feedback } from "@/components/charts/Feedback";
import { User } from "lucide-react";



export default function Dashboard() {

    const { onboarded_Patients, prescribed, nurture,doctorNames } = useSelector((state) => state.doctor);
    
    
    const mappedPatients = [...onboarded_Patients] // copy so original state not mutated
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
            moduleName: p.moduleName,
        }));



    return (
        // <div>
        //     <div>
        //         <Header title="Wellthy Ops " />
        //     </div>
        //     <div className={styles.patient_container}>
        //         <PatientStatusDetails title="Onboarded Patients" logo="/images/onboardedpatients.svg" color="#1B2559" count={onboarded_Patients.length} navigate="wellthyteam/onboarded" />
        //         <PatientStatusDetails title="Prescribed" logo="/images/Prescribed.svg" color="#23B883" count={prescribed.length} navigate="wellthyteam/prescribed" />
        //         <PatientStatusDetails title="Nurture Patients" logo="/images/Nurture.svg" color="#4085F3" count={nurture.length} navigate="wellthyteam/nurture" />
        //     </div>
        //     <div className={styles.second_section}>
        //         <div className={styles.second_section_left}>
        //             <CrmSyncLogs />
        //         </div>
        //         <div className={styles.second_section_right}>
        //             <Leads />
        //         </div>
        //     </div>
        //     <div className={styles.second_section}>
        //         <div className={styles.second_section_left}>
        //             <HCPerformance />
        //         </div>
        //         <div className={styles.second_section_right}>
        //             <FEActivity />
        //         </div>
        //     </div>
        //     <div>
        //         {/* <RecentPatientActivityContainer title="Recent Patient Activity" patient_Details={patient_Details} patientsDetails={<PatientActivityCard />} /> */}
        //         <RecentPatientActivityContainer
        //             title="Recent Patient Activity"
        //             patientsDetails={mappedPatients}
        //         />

        //     </div>
        // </div>

        <>
            <div>
                <div>
                    <Header title="Welcome" />
                </div>
                <div className={styles.patient_container}>
                    <PatientStatusDetails title="Onboarded Patients" logo="/images/onboardedpatients.svg" color="#1B2559" count={onboarded_Patients.length} />
                    <PatientStatusDetails title="Prescribed" logo="/images/Prescribed.svg" color="#23B883" count={prescribed.length} />
                    <PatientStatusDetails title="Nurture Patients" logo="/images/Nurture.svg" color="#4085F3" count={nurture.length} />
                </div>
                <div className={styles.second_section}>
                    <div className={styles.second_section_left}>
                        <PatientSegmentation />
                    </div>
                    <div className={styles.second_section_right} style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ border: "1px solid #D9D9D9", backgroundColor: "white", borderRadius: "4px", padding: "20px", margin: "10px", }}
                        >
                            <div>
                                <main style={{ display: 'flex', gap: '20px', padding: '24px',flexDirection:'column' }}>
                                    <PatientsKpiCard
                                        title="Total Patients Enrolled"
                                        value={onboarded_Patients.length}
                                        trend={12}
                                        icon={User}
                                        color="#10b981" // green
                                    />

                                    <PatientsKpiCard
                                        title="Total Doctors Participated"
                                        value={doctorNames.length}
                                        trend={8}
                                    />
                                </main>
                            </div>
                            {/* <div>
                            <main style={{ display: 'flex', gap: '20px', padding: '24px' }}>
                                <DoctorsKpiCard title="Total Doctors Participated" value={125} trend={8} />
                                <DoctorsKpiCard title="Active Programs" value={12} trend={-2} />
                            </main>
                        </div> */}

                        </div>
                    </div>
                </div>
                <div className={styles.second_section}>
                    <div className={styles.second_section_left}>
                        <GraphOuterContainer title="Gender" component={<GenderChart />} />
                    </div>
                    <div className={styles.second_section_right}>
                        {/* <UpcommingPatient /> */}
                        <GraphOuterContainer title="Age Group" component={<AgeGroupChart />} />
                    </div>
                </div>
                <div className={styles.second_section}>
                    <div className={styles.second_section_left}>
                        <GraphOuterContainer title="Patient Status Funnel" component={<PatientFunnelChart />} />
                    </div>
                    <div className={styles.second_section_right}>
                        {/* <UpcommingPatient /> */}
                        <GraphOuterContainer title="Program Rating Distribution" component={<RatingDistribution />} />
                    </div>
                </div>
                <div className={styles.second_section}>
                    <div className={styles.second_section_left}>
                        <GraphOuterContainer title="Call Completion Rate with Trendline" component={<CallCompletionChart />} />
                    </div>
                    <div className={styles.second_section_right}>
                        {/* <UpcommingPatient /> */}
                        <GraphOuterContainer title="Celevida Prescribed" component={<CelevidaChart />} />
                    </div>
                </div>
                <div className={styles.second_section}>
                    <div className={styles.second_section_left}>
                        <TopCitiesTable />

                    </div>
                    <div className={styles.second_section_right}>
                        <div style={{
                            border: "1px solid #D9D9D9",
                            backgroundColor: "white",
                            borderRadius: "4px",
                            padding: "20px",
                            margin: "10px",
                        }}
                        >

                            <Feedback />
                        </div>
                    </div>
                </div>
            </div >
        </>

    );
}
