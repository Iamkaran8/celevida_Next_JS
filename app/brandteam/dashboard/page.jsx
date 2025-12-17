
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
import { Feedback } from "../../../components/charts/Feedback";
import PatientsKpiCard from "../../../components/charts/PatientsKpiCard";
import TopCitiesTable from "../../../components/charts/TopCitiesTable";
import { User } from 'lucide-react';
import { selectFilteredPatients } from "../../../app/store/slices/doctorSlice";
import AverageChart from "../../../components/charts/AverageChart";
import { DoctorSegmentation } from "../../../components/charts/DoctorSegmentation";
import Filters from "../../../components/filter/Filters";
import { useState } from "react";
import { transformData } from "../../../app/utils/transformData";
import ExportButtons from "../../../components/ExportButtons/ExportButtons";
import { exportToPDF } from "../../../app/utils/exportUtils";
import * as BrandExport from "../../../app/utils/brandTeamExports";
import ClickableCard from "../../../components/ClickableCard/ClickableCard";

export default function Dashboard() {
    const filteredPatients = useSelector(selectFilteredPatients);
    // const { doctorNames } = useSelector((state) => state.doctor);

    const { prescribed, nurture, } = useSelector((state) => state.doctor);
    const { avgTableData, loading, error, totalPatients, onboardedPatients, Prescribed, Nurture, totalDoctorParticipated, genderCount, ageGroups, Call_Disposition, ratingCount, cities, Feedbacks } = useSelector((state) => state.superadmin);

    const [filters, setFilters] = useState({});
    const [isExporting, setIsExporting] = useState(false);

    // Calculate city-wise total clinics (sum across all cities)
    const totalClinicsAcrossCities = cities.reduce((sum, city) => sum + (city.totalClinics || 0), 0);
    const hba1cData = transformData(avgTableData, "HbA1c", "HbA1c");
    const bmiData = transformData(avgTableData, "BMI", "BMI");
    const weightData = transformData(avgTableData, "Body_Weight_kg", "Weight");
    const fbsData = transformData(avgTableData, "Fasting", "FBS");
    const ppbsData = transformData(avgTableData, "PPBG", "PPBS");
    const visceralFatData = transformData(avgTableData, "Visceral_Fat_Level", "VisceralFat");
    const muscleMassData = transformData(avgTableData, "Muscle_Mass", "MuscleMass");
    const muscleWeightData = transformData(avgTableData, "Muscle_Weight", "MuscleWeight");
    const boneMassData = transformData(avgTableData, "Bone_Mass_Kg", "BoneMass");
    const bodyFatData = transformData(avgTableData, "Body_Fat", "BodyFat");
    const musclePercentData = transformData(avgTableData, "Muscle", "MusclePercent");
    const proteinIntakeData = transformData(avgTableData, "hour_dietary_recall_protein_intake", "Protein");
    const carbIntakeData = transformData(avgTableData, "hour_dietary_recall_carb_intake", "Carbs");
    const calorieIntakeData = transformData(avgTableData, "hour_dietary_recall_calorie_intake", "Calories");
    const fiberIntakeData = transformData(avgTableData, "Fiber_Intake", "Fiber");

    // Export handlers with Brand Team specific exclusions
    const handleExportCSV = () => {
        setIsExporting(true);
        try {
            const exportData = {
                totalPatients,
                onboardedPatients,
                Prescribed,
                Nurture,
                totalDoctorParticipated,
                avgTableData,
                genderCount,
                ageGroups,
                Call_Disposition,
                ratingCount,
                cities,
                Feedbacks
            };
            BrandExport.exportBrandToCSV(exportData, filters);
        } catch (error) {
            console.error('Error exporting CSV:', error);
            alert('Failed to export CSV. Please try again.');
        } finally {
            setIsExporting(false);
        }
    };

    const handleExportPDF = async () => {
        setIsExporting(true);
        try {
            await exportToPDF(filters);
        } catch (error) {
            console.error('Error exporting PDF:', error);
            alert('Failed to export PDF. Please try again.');
        } finally {
            setIsExporting(false);
        }
    };

    // Individual component export handlers using Brand Team exports
    const exportData = {
        totalPatients,
        onboardedPatients,
        Prescribed,
        Nurture,
        totalDoctorParticipated,
        avgTableData,
        genderCount,
        ageGroups,
        Call_Disposition,
        ratingCount,
        cities,
        Feedbacks
    };

    // Brand Team specific exports with column exclusions
    const handleExportTotalPatients = (title) => BrandExport.exportBrandTotalPatients(exportData, filters, title);
    const handleExportWellness = (title) => BrandExport.exportBrandWellnessPatients(exportData, filters, title);
    const handleExportNurture = (title) => BrandExport.exportBrandNurturePatients(exportData, filters, title);
    const handleExportDoctors = (title) => BrandExport.exportBrandDoctorsList(exportData, filters, title);
    const handleExportPatientSegmentation = (title) => BrandExport.exportBrandPatientSegmentation(exportData, filters, title);
    const handleExportGender = (title) => BrandExport.exportBrandGenderData(exportData, filters, title);
    const handleExportAgeGroup = (title) => BrandExport.exportBrandAgeGroupData(exportData, filters, title);
    const handleExportPatientFunnel = (title) => BrandExport.exportBrandPatientFunnel(exportData, filters, title);
    const handleExportCallDisposition = (title) => BrandExport.exportBrandCallDisposition(exportData, filters, title);
    const handleExportTopCities = (title) => BrandExport.exportBrandTopCities(exportData, filters, title);
    const handleExportFeedback = (title) => BrandExport.exportBrandFeedback(exportData, filters, title);
    const handleExportDoctorSegmentation = (title) => BrandExport.exportBrandDoctorSegmentation(exportData, filters, title);
    const handleExportHealthMetric = (metricName, chartData, title) => BrandExport.exportBrandHealthMetric(metricName, chartData, exportData, title);

    return (
        <div>
            <Header title="Brand Team" />

            {/* Export Buttons */}
            <ExportButtons
                onExportCSV={handleExportCSV}
                onExportPDF={handleExportPDF}
                isExporting={isExporting}
            />

            <h3>Filters</h3>
            <div style={{ display: 'flex', justifyContent: 'end', marginBottom: '10px' }}>

                <Filters onFilterChange={setFilters} filtervalues={filters} />

            </div>

            {/* Selected Filters Display */}
            <div style={{ margin: "20px 0", padding: "10px", border: "1px solid #ddd", borderRadius: "6px", background: "#f9f9f9" }}>
                <h4>Selected Filters</h4>
                <p><b>Cities:</b> {filters.cities?.length > 0 ? filters.cities.join(', ') : "All"}</p>
                <p><b>Executives:</b> {filters.executives?.length > 0 ? filters.executives.join(', ') : "All"}</p>
                <p><b>Doctors:</b> {filters.doctors?.length > 0 ? filters.doctors.join(', ') : "All"}</p>
                <p><b>Status:</b> {filters.statuses?.length > 0 ? filters.statuses.join(', ') : "All"}</p>
                {filters.dateRange && (
                    <p><b>Date Range:</b> {filters.dateRange.startDate} - {filters.dateRange.endDate}</p>
                )}
            </div>

            {/* Patient Status Cards */}
            <div className={styles.patient_container}>
                <ClickableCard onExport={handleExportTotalPatients} title="Total Patients Screened">
                    <PatientStatusDetails
                        title="Total Patients Screened"
                        logo="/images/onboardedpatients.svg"
                        color="#1B2559"
                        count={totalPatients}
                    />
                </ClickableCard>
                <ClickableCard onExport={handleExportWellness} title="Wellness Patients">
                    <PatientStatusDetails
                        title="Prescribed"
                        logo="/images/Prescribed.svg"
                        color="#23B883"
                        count={Prescribed}
                    />
                </ClickableCard>
                <ClickableCard onExport={handleExportNurture} title="Nurture Patients">
                    <PatientStatusDetails
                        title="Nurture Patients "
                        logo="/images/Nurture.svg"
                        color="#4085F3"
                        count={Nurture}
                    />
                </ClickableCard>
            </div>

            {/* KPI Cards */}
            <div className={styles.second_section}>
                <div className={styles.second_section_left}>
                    <ClickableCard onExport={handleExportDoctorSegmentation} title="Doctor Segmentation">
                        <DoctorSegmentation />
                    </ClickableCard>
                </div>
                <div className={styles.second_section_right} style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ border: "1px solid #D9D9D9", backgroundColor: "white", borderRadius: "4px", padding: "20px", margin: "10px", display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <ClickableCard onExport={handleExportDoctors} title="Total Clinics/HCPs participated">
                            <PatientsKpiCard
                                title="Total Clinics/HCPs participated"
                                value={totalClinicsAcrossCities}
                                trend={12}
                                icon={User}
                                color="#10b981"
                            />
                        </ClickableCard>
                    </div>
                </div>
            </div>


            {/* Charts Section */}
            <div className={styles.second_section}>
                <div className={styles.second_section_left}>
                    <ClickableCard onExport={handleExportGender} title="Gender">
                        <GraphOuterContainer title="Gender" component={<GenderChart filteredPatients={filteredPatients} />} />
                    </ClickableCard>
                </div>
                <div className={styles.second_section_right}>
                    <ClickableCard onExport={handleExportAgeGroup} title="Age Group">
                        <GraphOuterContainer title="Age Group" component={<AgeGroupChart filteredPatients={filteredPatients} />} />
                    </ClickableCard>
                </div>
            </div>

            <div className={styles.second_section}>
                <div className={styles.second_section_left}>
                    <ClickableCard onExport={handleExportPatientFunnel} title="Patient Status Funnel">
                        <GraphOuterContainer title="Patient Status Funnel" component={<PatientFunnelChart filteredPatients={filteredPatients} />} />
                    </ClickableCard>
                </div>
                <div className={styles.second_section_right}>
                    <GraphOuterContainer title="Program Rating Distribution" component={<RatingDistribution filteredPatients={filteredPatients} />} />
                </div>
            </div>

            <div className={styles.second_section}>
                <div className={styles.second_section_left}>
                    <ClickableCard onExport={handleExportCallDisposition} title="Celevida Onboarded Call Coordination Trend">
                        <GraphOuterContainer title="  Celevida Onboarded Call Coordination Trend" component={<CallCompletionChart filteredPatients={filteredPatients} />} />
                    </ClickableCard>
                </div>
                <div className={styles.second_section_right}>
                    <ClickableCard onExport={handleExportFeedback} title="Feedback">
                        <div className={`${styles.second_section_right} ${styles.anotherClass}`} style={{ border: "1px solid #D9D9D9", backgroundColor: "white", borderRadius: "4px", padding: "20px", margin: "10px" }}>
                            <Feedback filteredPatients={filteredPatients} />
                        </div>
                    </ClickableCard>
                </div>
            </div>

            <div className={styles.second_section}>
                <div className={styles.second_section_left}>
                    <ClickableCard onExport={handleExportTopCities} title="City Wise Performance">
                        <TopCitiesTable filteredPatients={filteredPatients} />
                    </ClickableCard>
                </div>
                <div className={styles.second_section_right} >

                </div>
            </div>



            {/* Average Charts */}
            <ChartSection titleLeft="HbA1c Progress" dataLeft={hba1cData} dataKeyLeft="HbA1c" colorLeft="#B1740F"
                titleRight="BMI Progress" dataRight={bmiData} dataKeyRight="BMI" colorRight="#1789FC"
                onExportLeft={(title) => handleExportHealthMetric('HbA1c', hba1cData, title)}
                onExportRight={(title) => handleExportHealthMetric('BMI', bmiData, title)} />

            <ChartSection titleLeft="Weight Progress" dataLeft={weightData} dataKeyLeft="Weight" colorLeft="#F26419"
                titleRight="FBS Progress" dataRight={fbsData} dataKeyRight="FBS" colorRight="#fb6f92"
                onExportLeft={(title) => handleExportHealthMetric('Weight', weightData, title)}
                onExportRight={(title) => handleExportHealthMetric('FBS', fbsData, title)} />

            <ChartSection titleLeft="PPBS Progress" dataLeft={ppbsData} dataKeyLeft="PPBS" colorLeft="#fca311"
                titleRight="Visceral Fat Progress" dataRight={visceralFatData} dataKeyRight="VisceralFat" colorRight="#390099"
                onExportLeft={(title) => handleExportHealthMetric('PPBS', ppbsData, title)}
                onExportRight={(title) => handleExportHealthMetric('Visceral Fat', visceralFatData, title)} />

            <ChartSection titleLeft="Muscle Mass Progress (%)" dataLeft={muscleMassData} dataKeyLeft="MuscleMass" colorLeft="#fbf8cc"
                titleRight="Muscle Weight Progress" dataRight={muscleWeightData} dataKeyRight="MuscleWeight" colorRight="#00f5d4"
                onExportLeft={(title) => handleExportHealthMetric('Muscle Mass', muscleMassData, title)}
                onExportRight={(title) => handleExportHealthMetric('Muscle Weight', muscleWeightData, title)} />

            <ChartSection titleLeft="Bone Mass Progress" dataLeft={boneMassData} dataKeyLeft="BoneMass" colorLeft="#f48498"
                titleRight="Body Fat Progress (%)" dataRight={bodyFatData} dataKeyRight="BodyFat" colorRight="#1780a1"
                onExportLeft={(title) => handleExportHealthMetric('Bone Mass', boneMassData, title)}
                onExportRight={(title) => handleExportHealthMetric('Body Fat', bodyFatData, title)} />

            <ChartSection titleLeft="Muscle % Progress" dataLeft={musclePercentData} dataKeyLeft="MusclePercent" colorLeft="#aeb8fe"
                titleRight="Protein Intake (g)" dataRight={proteinIntakeData} dataKeyRight="Protein" colorRight="#570000"
                onExportLeft={(title) => handleExportHealthMetric('Muscle Percent', musclePercentData, title)}
                onExportRight={(title) => handleExportHealthMetric('Protein Intake', proteinIntakeData, title)} />

            <ChartSection titleLeft="Carb Intake (g)" dataLeft={carbIntakeData} dataKeyLeft="Carbs" colorLeft="#136f63"
                titleRight="Calorie Intake (kcal)" dataRight={calorieIntakeData} dataKeyRight="Calories" colorRight="red"
                onExportLeft={(title) => handleExportHealthMetric('Carb Intake', carbIntakeData, title)}
                onExportRight={(title) => handleExportHealthMetric('Calorie Intake', calorieIntakeData, title)} />

            <ChartSection titleLeft="Fiber Intake (Kcal)" dataLeft={fiberIntakeData} dataKeyLeft="Fiber" colorLeft="#22c55e"
                titleRight="" dataRight={{ data: [] }} dataKeyRight="" colorRight=""
                onExportLeft={(title) => handleExportHealthMetric('Fiber Intake', fiberIntakeData, title)}
                onExportRight={() => { }} />

        </div>
    );
}





// Reusable Chart Section Component
const ChartSection = ({ titleLeft, dataLeft, dataKeyLeft, colorLeft, domainLeft,
    titleRight, dataRight, dataKeyRight, colorRight, domainRight, onExportLeft, onExportRight }) => (
    <div className={styles.second_section}>
        <div className={styles.second_section_left}>
            <ClickableCard onExport={onExportLeft} title={titleLeft}>
                <GraphOuterContainer title={titleLeft} component={<AverageChart color={colorLeft} dataKey={dataKeyLeft} percentageChange={dataLeft.percentageChange} data={dataLeft.data} domain={domainLeft} />} />
            </ClickableCard>
        </div>
        <div className={styles.second_section_right}>
            <ClickableCard onExport={onExportRight} title={titleRight}>
                <GraphOuterContainer title={titleRight} component={<AverageChart color={colorRight} dataKey={dataKeyRight} data={dataRight.data} percentageChange={dataRight.percentageChange} domain={domainRight} />} />
            </ClickableCard>
        </div>
    </div>
);
