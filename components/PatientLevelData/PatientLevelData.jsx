


"use client"
import styles from '../../styles/patientleveldata/PatientLevel.module.css'
import { useSelector } from 'react-redux'

export const PatientLevelData = ({ patientData }) => {
    // fallback: use Redux if prop not passed
    const { data: reduxData, loading, error } = useSelector((state) => state.patient)
    const data = patientData || reduxData

    if (loading) return <p>Loading...</p>
    if (error) return <p style={{ color: "red" }}>{error.message}</p>
    if (!data) return <p>No patient data available</p>

    // Handle case: API might return { data: [...] } OR just [...]
    const patients = Array.isArray(data) ? data : data.data || []
    if (!patients.length) return <p>No patients found</p>

    const patient = patients[0]

    // Extract dietary intake arrays
    const calorieIntake = [
        patient.hour_dietary_recall_calorie_intake,
        patient.hour_dietary_recall_calorie_intake_Month_1,
        patient.hour_dietary_recall_calorie_intake_Month_2,
        patient.hour_dietary_recall_calorie_intake_Month_3,
    ]

    const carbIntake = [
        patient.hour_dietary_recall_carb_intake,
        patient.hour_dietary_recall_carb_intake_Month_1,
        patient.hour_dietary_recall_carb_intake_Month_2,
        patient.hour_dietary_recall_carb_intake_Month_3,
    ]

    const proteinIntake = [
        patient.hour_dietary_recall_protein_intake,
        patient.hour_dietary_recall_protein_intake_Month_1,
        patient.hour_dietary_recall_protein_intake_Month_2,
        patient.hour_dietary_recall_protein_intake_Month_3,
    ]

    // Compute Diet Recall (Avg Calorie) per month dynamically
    const dietRecallAvgByMonth = calorieIntake.map((_, index) => {
        const cal = Number(calorieIntake[index]) || 0
        const carb = Number(carbIntake[index]) || 0
        const protein = Number(proteinIntake[index]) || 0
        const sum = cal + carb + protein
        return sum ? Math.round(sum / 3) : "—"
    })

    const parameterMap = [
        { label: "Body Weight (kg)", values: [patient.Body_Weight_kg, patient.Body_Weight_kg_Month_1, patient.Body_Weight_kg_Month_2, patient.Body_Weight_kg_Month_3] },
        { label: "BMI (Body Mass Index)", values: [patient.BMI, patient.BMI_Month_1, patient.BMI_Month_2, patient.BMI_Month_3] },
        { label: "FBG", values: [patient.Fasting, patient.FBG_Month_1, patient.FBG_Month_2, patient.FBG_Month_3] },
        { label: "PPBG", values: [patient.PPBG, patient.PPBG_Month_1, patient.PPBG_Month_2, patient.PPBG_Month_3] },
        { label: "HbA1c", values: [patient.HbA1c, patient.HbA1c_Month_1, patient.HbA1c_Month_2, patient.HbA1c_Month_3] },
        { label: "Diet Recall (Avg Calorie)", values: dietRecallAvgByMonth },
        { label: "Calorie intake", values: calorieIntake },
        { label: "Carb intake", values: carbIntake },
        { label: "Protein intake", values: proteinIntake },
        { label: "Celevida Consumption", values: [patient.Time_of_Consumption, patient.Time_of_Consumption_Month1, patient.Time_of_Consumption_Month2, patient.Time_of_Consumption_Month3] },
        { label: "Usage frequency", values: [patient.Usage_frequency, patient.Usage_frequency_Month_1, patient.Usage_frequency_Month_2, patient.Usage_frequency_Month_3] },
        // { label: "Notes from the Virtual Coach", values: [patient.CoachNote_Baseline, patient.CoachNote_1M, patient.CoachNote_2M, patient.CoachNote_3M] },
        { label: "Notes for the Dr.", values: [patient.HC_Updates] },
        { label: "Sleep Pattern", values: [patient.Quality_hours_of_sleep_do_you_get_at_night, patient.Quality_hours_of_sleep_do_you_get_at_night_Month_1, patient.Quality_hours_of_sleep_do_you_get_at_night_Month_2, patient.Quality_hours_of_sleep_do_you_get_at_night_Month_3] },
        { label: "Water Consumption", values: [patient.How_many_litres_of_water_do_you_drink_in_a_day, patient.How_many_litres_of_water_do_you_drink_in_a_day_2, patient.How_many_litres_of_water_do_you_drink_in_a_day_3, patient.How_many_litres_of_water_do_you_drink_in_a_day_4] },
    ]

    return (
        <div>
            <h3>Patient Level Data</h3>
            <div className={styles.outter_box}>
                {/* Header */}
                <div className={styles.header}>
                    <div><h4>PARAMETERS</h4></div>
                    <div><h4>BASELINE</h4></div>
                    <div><h4>1 MONTH</h4></div>
                    <div><h4>2 MONTH</h4></div>
                    <div><h4>3 MONTH</h4></div>
                </div>

                {/* Rows */}
                {parameterMap.map((row, index) => (
                    <div className={styles.header} key={index}>
                        <div><p>{row.label}</p></div>
                        {row.values.map((val, i) => (
                            <div key={i}><p>{val ?? "—"}</p></div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}
