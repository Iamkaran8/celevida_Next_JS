



"use client";

import { useSelector } from "react-redux";
import styles from '../../../styles/dashboard/page.module.css';

import { PatientStatusDetails } from "../../../components/patientStatus/PatientStatusDetails";
import { PatientSegmentation } from "../../../components/patientSegmentation/PatientSegmentation";
import { Header } from "../../../components/header/Header";
import { GraphOuterContainer } from "../../../components/graphoutercontainer/GraphOuterContainer";

import GenderChart from "../../../components/charts/GenderChart";
import AgeGroupChart from "../../../components/charts/AgeGroupChart";
import PatientFunnelChart from "../../../components/charts/PatientFunnelChart";
import RatingDistribution from "../../../components/charts/RatingDistribution";
import CallCompletionChart from "../../../components/charts/CallCompletionChart";
import CelevidaChart from "../../../components/charts/CelevidaChart";
import TopCitiesTable from "../../../components/charts/TopCitiesTable";
import { Feedback } from "../../../components/charts/Feedback";
import AverageChart from "../../../components/charts/AverageChart";
import PatientsKpiCard from "../../../components/charts/PatientsKpiCard";

import { User } from "lucide-react";
import FilterBar from "@/components/filter/FilterBar";
import { selectFilteredPatients } from "../../../app/store/slices/doctorSlice";
import Filters from "../../../components/filter/Filters";
import { useState } from "react";

export default function Dashboard() {

    const [filters, setFilters] = useState({});
    // ✅ Get filtered patients from Redux slice
    const filteredPatients = useSelector(selectFilteredPatients);
    const { prescribed, nurture, doctorNames } = useSelector((state) => state.doctor);

    const mappedPatients = [...filteredPatients]
        .sort((a, b) => new Date(b.Created_Time) - new Date(a.Created_Time))
        .map((p, index) => ({
            id: p.id || index,
            patient_name: p.Last_Name || "Unknown",
            patient_id: `ID:#${p.id}`,
            status: p.StatusPrespcription || "N/A",
            phone_number: p.Mobile || "N/A",
            date: p.Created_Time
                ? new Date(p.Created_Time).toLocaleDateString("en-GB")
                : "N/A",
            moduleName: p.moduleName,
        }));

    const prescribedCount = filteredPatients.filter(p => p.StatusPrespcription === "Celevida_Onboarded").length;
    const nurtureCount = filteredPatients.filter(p => p.StatusPrespcription === "Celevida_Nurture").length;
    const notPrescribedCount = filteredPatients.filter(p => p.StatusPrespcription !== "Celevida_Onboarded" && p.StatusPrespcription !== "Celevida_Nurture").length;

    // const { onboarded_Patients, prescribed, nurture } = useSelector((state) => state.doctor)


    // Example metrics data
    const hba1cData = [
        { month: "Before Program", HbA1c: 8.5 },
        { month: "Month 1", HbA1c: 7.9 },
        { month: "Month 2", HbA1c: 7.5 },
        { month: "Month 3", HbA1c: 7.2 },
    ];

    const bmiData = [
        { month: "Before Program", BMI: 27.8 },
        { month: "Month 1", BMI: 26.9 },
        { month: "Month 2", BMI: 26.1 },
        { month: "Month 3", BMI: 25.4 },
    ];

    const weightData = [
        { month: "Before Program", Weight: 78 },
        { month: "Month 1", Weight: 76 },
        { month: "Month 2", Weight: 74 },
        { month: "Month 3", Weight: 72 },
    ];

    const fbsData = [
        { month: "Before Program", FBS: 160 },
        { month: "Month 1", FBS: 145 },
        { month: "Month 2", FBS: 130 },
        { month: "Month 3", FBS: 120 },
    ];

    const ppbsData = [
        { month: "Before Program", PPBS: 240 },
        { month: "Month 1", PPBS: 220 },
        { month: "Month 2", PPBS: 200 },
        { month: "Month 3", PPBS: 185 },
    ];

    const visceralFatData = [
        { month: "Before Program", VisceralFat: 14 },
        { month: "Month 1", VisceralFat: 13 },
        { month: "Month 2", VisceralFat: 12 },
        { month: "Month 3", VisceralFat: 11 },
    ];

    const muscleMassData = [
        { month: "Before Program", MuscleMass: 28 },
        { month: "Month 1", MuscleMass: 28.5 },
        { month: "Month 2", MuscleMass: 29 },
        { month: "Month 3", MuscleMass: 29.5 },
    ];

    const muscleWeightData = [
        { month: "Before Program", MuscleWeight: 24 },
        { month: "Month 1", MuscleWeight: 24.3 },
        { month: "Month 2", MuscleWeight: 24.6 },
        { month: "Month 3", MuscleWeight: 25 },
    ];

    const boneMassData = [
        { month: "Before Program", BoneMass: 3 },
        { month: "Month 1", BoneMass: 3.05 },
        { month: "Month 2", BoneMass: 3.1 },
        { month: "Month 3", BoneMass: 3.15 },
    ];

    const bodyFatData = [
        { month: "Before Program", BodyFat: 32 },
        { month: "Month 1", BodyFat: 31 },
        { month: "Month 2", BodyFat: 30 },
        { month: "Month 3", BodyFat: 29 },
    ];

    const musclePercentData = [
        { month: "Before Program", MusclePercent: 40 },
        { month: "Month 1", MusclePercent: 41 },
        { month: "Month 2", MusclePercent: 42 },
        { month: "Month 3", MusclePercent: 43 },
    ];

    const proteinIntakeData = [
        { month: "Before Program", Protein: 55 },
        { month: "Month 1", Protein: 60 },
        { month: "Month 2", Protein: 65 },
        { month: "Month 3", Protein: 70 },
    ];

    const carbIntakeData = [
        { month: "Before Program", Carbs: 250 },
        { month: "Month 1", Carbs: 240 },
        { month: "Month 2", Carbs: 230 },
        { month: "Month 3", Carbs: 220 },
    ];

    const calorieIntakeData = [
        { month: "Before Program", Calories: 2200 },
        { month: "Month 1", Calories: 2100 },
        { month: "Month 2", Calories: 2000 },
        { month: "Month 3", Calories: 1900 },
    ];



    return (
        <>
            <Header title="Welcome" />

            {/* Filter Bar */}
            <div style={{ display: 'flex', justifyContent: 'end', marginBottom: '10px' }}>
                {/* <FilterBar /> */}

            </div>
            <h3>Filters</h3>
            <div style={{ display: 'flex', justifyContent: 'end', marginBottom: '10px' }}>
                
                <Filters onFilterChange={setFilters} filtervalues={filters} />
                
            </div>

            {/* Patient Status Cards */}
            <div className={styles.patient_container}>
                <PatientStatusDetails
                    title="Onboarded Patients"
                    logo="/images/onboardedpatients.svg"
                    color="#1B2559"
                    count={filteredPatients.length}
                />
                <PatientStatusDetails
                    title="Prescribed"
                    logo="/images/Prescribed.svg"
                    color="#23B883"
                    count={prescribedCount}
                />
                <PatientStatusDetails
                    title="Nurture Patients"
                    logo="/images/Nurture.svg"
                    color="#4085F3"
                    count={nurtureCount}
                />
            </div>

            {/* KPI Cards */}
            <div className={styles.second_section}>
                <div className={styles.second_section_left}>
                    <PatientSegmentation />
                </div>
                <div className={styles.second_section_right} style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ border: "1px solid #D9D9D9", backgroundColor: "white", borderRadius: "4px", padding: "20px", margin: "10px", display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <PatientsKpiCard
                            title="Total Patients Enrolled"
                            value={filteredPatients.length}
                            trend={12}
                            icon={User}
                            color="#10b981"
                        />
                        <PatientsKpiCard
                            title="Total Doctors Participated"
                            value={doctorNames?.length}
                            trend={8}
                        />
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className={styles.second_section}>
                <div className={styles.second_section_left}>
                    <GraphOuterContainer title="Gender" component={<GenderChart />} />
                </div>
                <div className={styles.second_section_right}>
                    <GraphOuterContainer title="Age Group" component={<AgeGroupChart />} />
                </div>
            </div>

            <div className={styles.second_section}>
                <div className={styles.second_section_left}>
                    <GraphOuterContainer title="Patient Status Funnel" component={<PatientFunnelChart />} />
                </div>
                <div className={styles.second_section_right}>
                    <GraphOuterContainer title="Program Rating Distribution" component={<RatingDistribution />} />
                </div>
            </div>

            <div className={styles.second_section}>
                <div className={styles.second_section_left}>
                    <GraphOuterContainer title="Call Completion Rate with Trendline" component={<CallCompletionChart />} />
                </div>
                <div className={styles.second_section_right}>
                    {/* <GraphOuterContainer title="Celevida Prescribed" component={<CelevidaChart />} /> */}
                    <GraphOuterContainer title="Celevida Prescribed" component={<CelevidaChart filteredPatients={filteredPatients} />} />

                </div>
            </div>

            <div className={styles.second_section}>
                <div className={styles.second_section_left}>
                    <TopCitiesTable />
                </div>
                <div className={styles.second_section_right} style={{ border: "1px solid #D9D9D9", backgroundColor: "white", borderRadius: "4px", padding: "20px", margin: "10px" }}>
                    <Feedback />
                </div>
            </div>

            {/* Average Charts */}
            <ChartSection titleLeft="HbA1c Progress" dataLeft={hba1cData} dataKeyLeft="HbA1c" colorLeft="#B1740F"
                titleRight="BMI Progress" dataRight={bmiData} dataKeyRight="BMI" colorRight="#1789FC" domainLeft={[6, 10]} domainRight={[20, 30]} />

            <ChartSection titleLeft="Weight Progress" dataLeft={weightData} dataKeyLeft="Weight" colorLeft="#F26419"
                titleRight="FBS Progress" dataRight={fbsData} dataKeyRight="FBS" colorRight="#fb6f92" domainLeft={[60, 90]} domainRight={[100, 200]} />

            <ChartSection titleLeft="PPBS Progress" dataLeft={ppbsData} dataKeyLeft="PPBS" colorLeft="#fca311"
                titleRight="Visceral Fat Progress" dataRight={visceralFatData} dataKeyRight="VisceralFat" colorRight="#390099" domainLeft={[150, 250]} domainRight={[8, 16]} />

            <ChartSection titleLeft="Muscle Mass Progress (%)" dataLeft={muscleMassData} dataKeyLeft="MuscleMass" colorLeft="#fbf8cc"
                titleRight="Muscle Weight Progress" dataRight={muscleWeightData} dataKeyRight="MuscleWeight" colorRight="#00f5d4" domainLeft={[25, 35]} domainRight={[20, 30]} />

            <ChartSection titleLeft="Bone Mass Progress" dataLeft={boneMassData} dataKeyLeft="BoneMass" colorLeft="#f48498"
                titleRight="Body Fat Progress (%)" dataRight={bodyFatData} dataKeyRight="BodyFat" colorRight="#1780a1" domainLeft={[2, 4]} domainRight={[25, 40]} />

            <ChartSection titleLeft="Muscle % Progress" dataLeft={musclePercentData} dataKeyLeft="MusclePercent" colorLeft="#aeb8fe"
                titleRight="Protein Intake (g)" dataRight={proteinIntakeData} dataKeyRight="Protein" colorRight="#570000" domainLeft={[35, 50]} domainRight={[50, 80]} />

            <ChartSection titleLeft="Carb Intake (g)" dataLeft={carbIntakeData} dataKeyLeft="Carbs" colorLeft="#136f63"
                titleRight="Calorie Intake (kcal)" dataRight={calorieIntakeData} dataKeyRight="Calories" colorRight="red" domainLeft={[200, 280]} domainRight={[1800, 2400]} />

        </>
    );
}

// Reusable Chart Section Component
const ChartSection = ({ titleLeft, dataLeft, dataKeyLeft, colorLeft, domainLeft,
    titleRight, dataRight, dataKeyRight, colorRight, domainRight }) => (
    <div className={styles.second_section}>
        <div className={styles.second_section_left}>
            <GraphOuterContainer title={titleLeft} component={<AverageChart color={colorLeft} dataKey={dataKeyLeft} data={dataLeft} domain={domainLeft} />} />
        </div>
        <div className={styles.second_section_right}>
            <GraphOuterContainer title={titleRight} component={<AverageChart color={colorRight} dataKey={dataKeyRight} data={dataRight} domain={domainRight} />} />
        </div>
    </div>
);
