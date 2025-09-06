"use client";

import { PatientStatusDetails } from "../../../components/patientStatus/PatientStatusDetails";
import styles from '../../../styles/dashboard/page.module.css'
import { UpcommingPatient } from "../../../components/upcommingPatient/UpcommingPatient";
import { PatientSegmentation } from "../../../components/patientSegmentation/PatientSegmentation";
import { RecentPatientActivityContainer } from "../../../components/recentPatientActivity/RecentPatientActivityContainer";
import { Header } from "../../../components/header/Header";
import { useSelector } from "react-redux";
import { GraphOuterContainer } from "../../../components/graphoutercontainer/GraphOuterContainer";
import GenderChart from "../../../components/charts/GenderChart";
import LineChart from "../../../components/charts/LineChart";
import AgeGroupChart from "../../../components/charts/AgeGroupChart";
import PatientFunnelChart from "../../../components/charts/PatientFunnelChart";
import RatingDistribution from "../../../components/charts/RatingDistribution";
import CallCompletionChart from "../../../components/charts/CallCompletionChart";
import CelevidaChart from "../../../components/charts/CelevidaChart";
import { Feedback } from "../../../components/charts/Feedback";

import DoctorsKpiCard from "../../../components/charts/DoctorsKpiCard";
import PatientsKpiCard from "../../../components/charts/PatientsKpiCard";
import { User } from 'lucide-react';
import TopCitiesTable from "../../../components/charts/TopCitiesTable";





export default function Dashboard() {

    const { onboarded_Patients, prescribed, nurture } = useSelector((state) => state.doctor)



    return (
        <div>
            <div>
                <Header title="Brand Team" />
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
                    <div style={{border: "1px solid #D9D9D9",backgroundColor: "white",borderRadius: "4px",padding: "20px",margin: "10px",}}
                    >
                        <div>
                            <main style={{ display: 'flex', gap: '20px', padding: '24px' }}>
                                <PatientsKpiCard
                                    title="Total Patients Enrolled"
                                    value={onboarded_Patients.length}
                                    trend={12}
                                    icon={User}
                                    color="#10b981" // green
                                />

                                <PatientsKpiCard
                                    title="Total Doctors Participated"
                                    value={125}
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
    );
}
