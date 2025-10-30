"use client";

import { useSelector } from "react-redux";
import styles from '../../../styles/dashboard/page.module.css';
import { PatientStatusDetails } from "../../../components/patientStatus/PatientStatusDetails";
import { Header } from "../../../components/header/Header";
import { GraphOuterContainer } from "../../../components/graphoutercontainer/GraphOuterContainer";
import GenderChart from "../../../components/charts/GenderChart";
import AgeGroupChart from "../../../components/charts/AgeGroupChart";
import PatientFunnelChart from "../../../components/charts/PatientFunnelChart";
import RatingDistribution from "../../../components/charts/RatingDistribution";
import CallCompletionChart from "../../../components/charts/CallCompletionChart";
import TopCitiesTable from "../../../components/charts/TopCitiesTable";
import { Feedback } from "../../../components/charts/Feedback";
import AverageChart from "../../../components/charts/AverageChart";
import PatientsKpiCard from "../../../components/charts/PatientsKpiCard";
import { User } from "lucide-react";
import { selectFilteredPatients } from "../../../app/store/slices/doctorSlice";
import Filters from "../../../components/filter/Filters";
import { useState } from "react";
import { transformData } from "../../../app/utils/transformData";
import { DoctorSegmentation } from "../../../components/charts/DoctorSegmentation";
import { Loader } from "../../../components/loader/Loader";
import ExportButtons from "../../../components/ExportButtons/ExportButtons";
import { exportToCSV, exportToPDF } from "../../../app/utils/exportUtils";
import ClickableCard from "../../../components/ClickableCard/ClickableCard";
import * as ExcelExport from "../../../app/utils/excelExportUtils";


export default function Dashboard() {

    const [filters, setFilters] = useState({});
    const [isExporting, setIsExporting] = useState(false);

    const filteredPatients = useSelector(selectFilteredPatients);
    const { prescribed, nurture, doctorNames } = useSelector((state) => state.doctor);
    const { avgTableData, loading, error, totalPatients, onboardedPatients, Prescribed, Nurture, totalDoctorParticipated, genderCount, ageGroups, Call_Disposition, ratingCount, cities, Feedbacks } = useSelector((state) => state.superadmin);

    // Calculate city-wise total clinics (sum across all cities)
    const totalClinicsAcrossCities = cities.reduce((sum, city) => sum + (city.totalClinics || 0), 0);

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

    // const prescribedCount = filteredPatients.filter(p => p.StatusPrespcription === "Celevida_Onboarded").length;
    // const nurtureCount = filteredPatients.filter(p => p.StatusPrespcription === "Celevida_Nurture").length;
    // const notPrescribedCount = filteredPatients.filter(p => p.StatusPrespcription !== "Celevida_Onboarded" && p.StatusPrespcription !== "Celevida_Nurture").length;




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

    if (loading) return <Loader />;
    if (error) return <p>Error loading data</p>;
    if (!avgTableData?.length) return <p>No data available</p>;

    // Export handlers
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
            exportToCSV(exportData, filters);
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

    // Individual component export handlers
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

    const handleExportTotalPatients = () => ExcelExport.exportPatientsList(exportData, filters);
    const handleExportDoctors = () => ExcelExport.exportDoctorsList(exportData, filters);
    const handleExportPrescribed = () => {
        const prescribedData = {
            ...exportData,
            Feedbacks: exportData.Feedbacks?.filter(p => p.StatusPrespcription === 'Celevida_Onboarded')
        };
        ExcelExport.exportPatientsList(prescribedData, filters);
    };
    const handleExportNurture = () => {
        const nurtureData = {
            ...exportData,
            Feedbacks: exportData.Feedbacks?.filter(p => p.StatusPrespcription === 'Celevida_Nurture')
        };
        ExcelExport.exportPatientsList(nurtureData, filters);
    };
    const handleExportGender = () => ExcelExport.exportGenderData(exportData, filters);
    const handleExportAgeGroup = () => ExcelExport.exportAgeGroupData(exportData, filters);
    const handleExportPatientSegmentation = () => ExcelExport.exportPatientSegmentation(exportData, filters);
    const handleExportDoctorSegmentation = () => ExcelExport.exportDoctorSegmentation(exportData, filters);
    const handleExportCallDisposition = () => ExcelExport.exportCallDispositionData(exportData, filters);
    const handleExportRating = () => ExcelExport.exportRatingData(exportData, filters);
    const handleExportTopCities = () => ExcelExport.exportTopCitiesData(exportData, filters);




    return (
        <>
            <Header title="Welcome" />

            {/* Export Buttons */}
            <ExportButtons 
                onExportCSV={handleExportCSV} 
                onExportPDF={handleExportPDF}
                isExporting={isExporting}
            />

            {/* Filter Bar */}
            <div style={{ display: 'flex', justifyContent: 'end', marginBottom: '10px' }}>
                {/* <FilterBar /> */}

            </div>

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
                <ClickableCard onExport={handleExportTotalPatients}>
                    <PatientStatusDetails
                        title="Total Patients"
                        logo="/images/onboardedpatients.svg"
                        color="#1B2559"
                        count={totalPatients}
                    />
                    
                </ClickableCard>
                <ClickableCard onExport={handleExportPrescribed}>
                    <PatientStatusDetails
                        title="Prescribed"
                        logo="/images/Prescribed.svg"
                        color="#23B883"
                        count={Prescribed}
                    />
                </ClickableCard>
                <ClickableCard onExport={handleExportNurture}>
                    <PatientStatusDetails
                        title="Nurture Patients"
                        logo="/images/Nurture.svg"
                        color="#4085F3"
                        count={Nurture}
                    />
                </ClickableCard>
            </div>

            {/* KPI Cards */}
            <div className={styles.second_section}>
                <div className={styles.second_section_left}>
                    {/* <PatientSegmentation /> */}
                    <ClickableCard onExport={handleExportDoctorSegmentation}>
                        <DoctorSegmentation />
                    </ClickableCard>
                </div>
                <div className={styles.second_section_right} style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ border: "1px solid #D9D9D9", backgroundColor: "white", borderRadius: "4px", padding: "20px", margin: "10px", display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <ClickableCard onExport={handleExportTotalPatients}>
                            <PatientsKpiCard
                                title="Total Clinics/HCPs participated"
                                value={totalClinicsAcrossCities}
                                trend={12}
                                icon={User}
                                color="#10b981"
                            />
                        </ClickableCard>
                        <ClickableCard onExport={handleExportDoctors}>
                            <PatientsKpiCard
                                title="  Total Camps/Visits Conducted"
                                value={totalDoctorParticipated}
                                trend={8}
                            />
                        </ClickableCard>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className={styles.second_section}>
                <div className={styles.second_section_left}>
                    <ClickableCard onExport={handleExportGender}>
                        <GraphOuterContainer title="Gender" component={<GenderChart />} />
                    </ClickableCard>
                </div>
                <div className={styles.second_section_right}>
                    <ClickableCard onExport={handleExportAgeGroup}>
                        <GraphOuterContainer title="Age Group" component={<AgeGroupChart />} />
                    </ClickableCard>
                </div>
            </div>

            <div className={styles.second_section}>
                <div className={styles.second_section_left}>
                    <ClickableCard onExport={handleExportPatientSegmentation}>
                        <GraphOuterContainer title="Patient Status Funnel" component={<PatientFunnelChart />} />
                    </ClickableCard>
                </div>
                <div className={styles.second_section_right}>
                    <ClickableCard onExport={handleExportRating}>
                        <GraphOuterContainer title="Program Rating Distribution" component={<RatingDistribution />} />
                    </ClickableCard>
                </div>
            </div>

            <div className={styles.second_section}>
                <div className={styles.second_section_left}>
                    <ClickableCard onExport={handleExportCallDisposition}>
                        <GraphOuterContainer title="  Celevida Onboarded Call Coordination Trend" component={<CallCompletionChart />} />
                    </ClickableCard>
                </div>

                <div className={`${styles.second_section_right} ${styles.anotherClass}`} style={{ background: '#fff', border: '1px solid #d9d9d9', borderRadius: '4px', margin: '10px', padding: '20px' }}>
                    <Feedback />
                </div>
            </div>

            <div className={styles.second_section}>
                <div className={styles.second_section_left}>
                    <ClickableCard onExport={handleExportTopCities}>
                        <TopCitiesTable />
                    </ClickableCard>
                </div>
                <div className={styles.second_section_right} >

                </div>
            </div>

            {/* Average Charts */}
            <ChartSection 
                titleLeft="HbA1c Progress" dataLeft={hba1cData} dataKeyLeft="HbA1c" colorLeft="#B1740F"
                titleRight="BMI Progress" dataRight={bmiData} dataKeyRight="BMI" colorRight="#1789FC"
                onExportLeft={() => ExcelExport.exportHealthMetricData('HbA1c', hba1cData, exportData)}
                onExportRight={() => ExcelExport.exportHealthMetricData('BMI', bmiData, exportData)}
            />

            <ChartSection 
                titleLeft="Weight Progress" dataLeft={weightData} dataKeyLeft="Weight" colorLeft="#F26419"
                titleRight="FBS Progress" dataRight={fbsData} dataKeyRight="FBS" colorRight="#fb6f92"
                onExportLeft={() => ExcelExport.exportHealthMetricData('Weight', weightData, exportData)}
                onExportRight={() => ExcelExport.exportHealthMetricData('FBS', fbsData, exportData)}
            />

            <ChartSection 
                titleLeft="PPBS Progress" dataLeft={ppbsData} dataKeyLeft="PPBS" colorLeft="#fca311"
                titleRight="Visceral Fat Progress" dataRight={visceralFatData} dataKeyRight="VisceralFat" colorRight="#390099"
                onExportLeft={() => ExcelExport.exportHealthMetricData('PPBS', ppbsData, exportData)}
                onExportRight={() => ExcelExport.exportHealthMetricData('Visceral Fat', visceralFatData, exportData)}
            />

            <ChartSection 
                titleLeft="Muscle Mass Progress (%)" dataLeft={muscleMassData} dataKeyLeft="MuscleMass" colorLeft="#fbf8cc"
                titleRight="Muscle Weight Progress" dataRight={muscleWeightData} dataKeyRight="MuscleWeight" colorRight="#00f5d4"
                onExportLeft={() => ExcelExport.exportHealthMetricData('Muscle Mass', muscleMassData, exportData)}
                onExportRight={() => ExcelExport.exportHealthMetricData('Muscle Weight', muscleWeightData, exportData)}
            />

            <ChartSection 
                titleLeft="Bone Mass Progress" dataLeft={boneMassData} dataKeyLeft="BoneMass" colorLeft="#f48498"
                titleRight="Body Fat Progress (%)" dataRight={bodyFatData} dataKeyRight="BodyFat" colorRight="#1780a1"
                onExportLeft={() => ExcelExport.exportHealthMetricData('Bone Mass', boneMassData, exportData)}
                onExportRight={() => ExcelExport.exportHealthMetricData('Body Fat', bodyFatData, exportData)}
            />

            <ChartSection 
                titleLeft="Muscle % Progress" dataLeft={musclePercentData} dataKeyLeft="MusclePercent" colorLeft="#aeb8fe"
                titleRight="Protein Intake (g)" dataRight={proteinIntakeData} dataKeyRight="Protein" colorRight="#570000"
                onExportLeft={() => ExcelExport.exportHealthMetricData('Muscle Percent', musclePercentData, exportData)}
                onExportRight={() => ExcelExport.exportHealthMetricData('Protein Intake', proteinIntakeData, exportData)}
            />

            <ChartSection 
                titleLeft="Carb Intake (g)" dataLeft={carbIntakeData} dataKeyLeft="Carbs" colorLeft="#136f63"
                titleRight="Calorie Intake (kcal)" dataRight={calorieIntakeData} dataKeyRight="Calories" colorRight="red"
                onExportLeft={() => ExcelExport.exportHealthMetricData('Carb Intake', carbIntakeData, exportData)}
                onExportRight={() => ExcelExport.exportHealthMetricData('Calorie Intake', calorieIntakeData, exportData)}
            />

        </>
    );
}

// Reusable Chart Section Component
const ChartSection = ({ titleLeft, dataLeft, dataKeyLeft, colorLeft, domainLeft,
    titleRight, dataRight, dataKeyRight, colorRight, domainRight, onExportLeft, onExportRight }) => (
    <div className={styles.second_section}>
        <div className={styles.second_section_left}>
            <ClickableCard onExport={onExportLeft}>
                <GraphOuterContainer title={titleLeft} component={<AverageChart color={colorLeft} dataKey={dataKeyLeft} percentageChange={dataLeft.percentageChange} data={dataLeft.data} domain={domainLeft} />} />
            </ClickableCard>
        </div>
        <div className={styles.second_section_right}>
            <ClickableCard onExport={onExportRight}>
                <GraphOuterContainer title={titleRight} component={<AverageChart color={colorRight} dataKey={dataKeyRight} data={dataRight.data} percentageChange={dataRight.percentageChange} domain={domainRight} />} />
            </ClickableCard>
        </div>
    </div>
);
