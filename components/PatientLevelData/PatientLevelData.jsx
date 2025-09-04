


// import styles from '@/styles/patientleveldata/PatientLevel.module.css'
// import { useSelector } from 'react-redux'

// export const PatientLevelData = () => {
//     const { data, loading, error } = useSelector((state) => state.patient)

//     if (loading) return <p>Loading...</p>
//     if (error) return <p style={{ color: "red" }}>{error.message}</p>
//     if (!data) return <p>No patient data available</p>

//     // Handle case: API might return { data: [...] } OR just [...]
//     const patients = Array.isArray(data) ? data : data.data || []
//     if (!patients.length) return <p>No patients found</p>

//     const patient = patients[0] // pick first one for now

//     const parameterMap = {
//         "Body Weight (kg)": patient.Body_Weight_kg,
//         "BMI (Body Mass Index)": patient.BMI,
//         "FBG": patient.FBG ?? "no data",
//         "PPBG": patient.PPBG ?? "no data",
//         "HbA1c": patient.HbA1c_Month_1 ?? "no data",
//         "Diet Recall (Avg Calorie)": "no data",
//         "Calorie intake": patient.hour_dietary_recall_calorie_intake,
//         "Carb intake": patient.hour_dietary_recall_carb_intake,
//         "Protein intake": patient.hour_dietary_recall_protein_intake,
//         "Celevida Consumption": patient.Time_of_Consumption,
//         "Usage frequency": "no data",
//         "Notes from the Virtual Coach": "no data",
//         "Notes from the Virtual Coach for the Dr.": "no data",
//         "Sleep Pattern": patient.Quality_hours_of_sleep_do_you_get_at_night,
//         "Water Consumption": patient.How_many_litres_of_water_do_you_drink_in_a_day,
//     }

//     return (
//         <>
//             <div>
//                 <h3>Patient Level Data</h3>
//             </div>

//             <div className={styles.outter_box}>
//                 {/* Table Header */}
//                 <div className={styles.header}>
//                     <div><h4>PARAMETERS</h4></div>
//                     <div><h4>VALUE</h4></div>
//                 </div>

//                 {/* Data Rows */}
//                 {Object.entries(parameterMap).map(([key, value], index) => (
//                     <div className={styles.header} key={index}>
//                         <div><p>{key}</p></div>
//                         <div><p>{value}</p></div>
//                     </div>
//                 ))}
//             </div>
//         </>
//     )
// }



import styles from '@/styles/patientleveldata/PatientLevel.module.css'
import { useSelector } from 'react-redux'

export const PatientLevelData = () => {
    const { data, loading, error } = useSelector((state) => state.patient)

    if (loading) return <p>Loading...</p>
    if (error) return <p style={{ color: "red" }}>{error.message}</p>
    if (!data) return <p>No patient data available</p>

    // Handle case: API might return { data: [...] } OR just [...]
    const patients = Array.isArray(data) ? data : data.data || []
    if (!patients.length) return <p>No patients found</p>

    const patient = patients[0] // pick first one for now

    // Define rows with values per month
    const parameterMap = [
        {
            label: "Body Weight (kg)",
            values: [patient.Weight, patient.Body_Weight_kg_Month_1, patient.Body_Weight_kg_Month_2, patient.Body_Weight_kg_Month_3],
        },
        {
            label: "BMI (Body Mass Index)",
            values: [patient.BMI, patient.BMI_Month_1, patient.BMI_Month_2, patient.BMI_Month_3],
        },
        {
            label: "FBG",
            values: [patient.FBG_Month_1, patient.FBG_Month_1, patient.FBG_Month_2, patient.FBG_Month_3],
        },
        {
            label: "PPBG",
            values: [patient.PPBG, patient.PPBG_Month_1, patient.PPBG_Month_2, patient.PPBG_Month_3],
        },
        {
            label: "HbA1c",
            values: [patient.HbA1c_Month_1, patient.HbA1c_Month_1, patient.HbA1c_Month_2, patient.HbA1c_Month_3],
        },
        {
            label: "Diet Recall (Avg Calorie)",
            values: [patient.DietRecall_Baseline, patient.DietRecall_1M, patient.DietRecall_2M, patient.DietRecall_3M],
        },
        {
            label: "Calorie intake",
            values: [patient.hour_dietary_recall_calorie_intake, patient.hour_dietary_recall_calorie_intake_Month_1, patient.hour_dietary_recall_calorie_intake_Month_2, patient.hour_dietary_recall_calorie_intake_Month_3],
        },
        {
            label: "Carb intake",
            values: [patient.hour_dietary_recall_carb_intake, patient.hour_dietary_recall_carb_intake_Month_1, patient.hour_dietary_recall_carb_intake_Month_2, patient.hour_dietary_recall_carb_intake_Month_3],
        },
        {
            label: "Protein intake",
            values: [patient.hour_dietary_recall_protein_intake, patient.hour_dietary_recall_protein_intake_Month1, patient.hour_dietary_recall_protein_intake_Month2, patient.hour_dietary_recall_protein_intake_Month3],
        },
        {
            label: "Celevida Consumption",
            values: [patient.Time_of_Consumption, patient.Time_of_Consumption_Month1, patient.Time_of_Consumption_Month2, patient.Time_of_Consumption_Month3],
        },
        {
            label: "Usage frequency",
            values: [patient.Usage_frequency_Month_1, patient.Usage_frequency_Month_1, patient.Usage_frequency_Month_1, patient.Usage_frequency_Month_1],
        },
        {
            label: "Notes from the Virtual Coach",
            values: [patient.CoachNote_Baseline, patient.CoachNote_1M, patient.CoachNote_2M, patient.CoachNote_3M],
        },
        {
            label: "Notes from the Virtual Coach for the Dr.",
            values: [patient.HC_Updates],
        },
        {
            label: "Sleep Pattern",
            values: [patient.Quality_hours_of_sleep_do_you_get_at_night, patient.Quality_hours_of_sleep_do_you_get_at_night_Month_1, patient.Quality_hours_of_sleep_do_you_get_at_night_Month_2, patient.Quality_hours_of_sleep_do_you_get_at_night_Month_3],
        },
        {
            label: "Water Consumption",
            values: [patient.How_many_litres_of_water_do_you_drink_in_a_day, patient.How_many_litres_of_water_do_you_drink_in_a_day_2, patient.How_many_litres_of_water_do_you_drink_in_a_day_2, patient.How_many_litres_of_water_do_you_drink_in_a_day_3],
        },
    ]

    return (
        <>
            <div>
                <h3>Patient Level Data</h3>
            </div>

            <div className={styles.outter_box}>
                {/* Table Header */}
                <div className={styles.header}>
                    <div><h4>PARAMETERS</h4></div>
                    <div><h4>BASELINE</h4></div>
                    <div><h4>1 MONTH</h4></div>
                    <div><h4>2 MONTH</h4></div>
                    <div><h4>3 MONTH</h4></div>
                </div>

                {/* Data Rows */}
                {parameterMap.map((row, index) => (
                    <div className={styles.header} key={index}>
                        <div><p>{row.label}</p></div>
                        {row.values.map((val, i) => (
                            <div key={i}><p>{val ?? "—"}</p></div>
                        ))}
                    </div>
                ))}
            </div>
        </>
    )
}
