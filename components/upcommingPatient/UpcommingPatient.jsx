

"use client";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/dashboard/upcommingPatient/upcommingpatient.module.css";
import { fetchUpcomingDoctors } from "../../app/store/slices/upcomingDoctorSlice";
import { useEffect, useState } from "react";
import AssesmentReport from "../assesmentReport/AssesmentReport";
import PatientInformationPopup from "../patientInformationPopup/PatientInformationPopup";
import { patientcompletedataapi } from "../../app/utils/apis/patientcompletedataapi";
import { addNewData } from "../..//app/store/slices/patientSlice";
import { PatientLevelData } from "../PatientLevelData/PatientLevelData";

export const UpcommingPatient = () => {

    const dispatch = useDispatch();
    const { doctors, loading, error } = useSelector(
        (state) => state.upcomingDoctors
    );

    const [showInfo, setShowInfo] = useState(false);
    const [showReport, setShowReport] = useState(false);

    const { user } = useSelector((state) => state.auth)
    const savedDoctor = localStorage.getItem("selectedDoctor");
    const doctor_Name = user.data.data[0].role === "Doctor" ? user.data.data[0].Name : savedDoctor
    useEffect(() => {
        dispatch(fetchUpcomingDoctors(doctor_Name));
    }, [dispatch]);



    if (loading) return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <p>Loading...</p>
        </div>
    );

    if (error) return <p>Error: {error}</p>;
    if (!doctors?.data?.length) return <div className={styles.upcommingPatient_container}> <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }} ><h3>No upcoming patients</h3></div></div>;

    const patient = doctors.data[0];

    // Format Created_Time
    const isoString = patient.Created_Time;
    const date = new Date(isoString);
    const formatted =
        String(date.getMonth() + 1).padStart(2, "0") +
        "/" +
        String(date.getDate()).padStart(2, "0") +
        "/" +
        date.getFullYear();

    if (patient.Last_Name == "") {
        return <h1>No Upcoming Patient</h1>;
    }

    const handleView = () => {
        dispatch(addNewData(patient))
        setShowInfo(true)
    }

    return (
        <>
            <div className={styles.upcommingPatient_container}>
                <div className={styles.upcommingPatient_inner}>
                    <div style={{ display: "flex" }}>
                        <div className={styles.patient_details_left}>
                            <span className={styles.up_txt}>Upcoming patient </span>
                            <span className={styles.pt_name}>{patient.Last_Name}</span>
                            <span className={styles.pt_number}>+91{patient.Phone}</span>
                        </div>
                        <div className={styles.patient_details_right}>
                            <span className={styles.date_txt}>
                                Date : <span>{formatted}</span>
                            </span>
                        </div>
                        <button
                            onClick={() => dispatch(fetchUpcomingDoctors())}
                            style={{
                                background: "transparent",
                                border: "none",
                                cursor: "pointer",
                                padding: "4px",
                            }}
                            title="Refresh"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M17.65 6.35A7.95 7.95 0 0 0 12 4V1L7 6l5 5V7c2.76 
          0 5 2.24 5 5a5 5 0 0 1-8.9 3h-2.1c1.2 2.9 
          4.06 5 7.5 5 4.42 0 8-3.58 
          8-8 0-2.21-.9-4.21-2.35-5.65z" />
                            </svg>
                        </button>
                    </div>

                    <div>
                        <p className={styles.coach}>
                            Coach :
                            <span className={styles.coach_name}>
                                {patient.Owner?.name ?? "N/A"}
                            </span>
                        </p>
                        <p>
                            <svg
                                className={styles.phone_icon}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 640 640"
                            >
                                <path d="M224.2 89C216.3 70.1 195.7 60.1 176.1 65.4L170.6 66.9C106 84.5 50.8 147.1 66.9 223.3C104 398.3 241.7 536 416.7 573.1C493 589.3 555.5 534 573.1 469.4L574.6 463.9C580 444.2 569.9 423.6 551.1 415.8L453.8 375.3C437.3 368.4 418.2 373.2 406.8 387.1L368.2 434.3C297.9 399.4 241.3 341 208.8 269.3L253 233.3C266.9 222 271.6 202.9 264.8 186.3L224.2 89z" />
                            </svg>
                            <span className={styles.red_clr_txt}> Upcoming Call on</span>
                            <span className={styles.date}>
                                {" "}
                                {patient.Appointment_Date}
                            </span>
                        </p>
                    </div>
                </div>

                <div className={styles.btn_cont}>
                    {/* 👇 Show PatientInformationPopup first */}
                    <button onClick={() => handleView()}>View</button>
                    <button onClick={() => setShowReport(true)}>Download Pdf</button>
                </div>
            </div>

            {/* 👇 Show Patient Information Popup */}
            {showInfo && (
                <PatientInformationPopup
                    selectedPatient={patient}
                    details={{ data: [patient] }} // match your component’s expected structure
                    status={patient.StatusPrespcription}
                    onClose={() => setShowInfo(false)}
                    onViewReport={() => {
                        setShowInfo(false);
                        setShowReport(true);
                    }}

                >
                </PatientInformationPopup>
            )}

            {/* 👇 Show Assessment Report */}
            {showReport && (
                <AssesmentReport
                    name={patient.Last_Name}
                    age={patient.Age}
                    weight={patient.Weight}
                    height={patient.Height}
                    gender={patient.Genders}
                    phone={patient.Phone}
                    status={patient.Status}
                    allData={patient}
                    onClose={() => setShowReport(false)}
                />
            )}
        </>
    );
};
