
"use client";

import styles from '../../styles/popup/patientInformationPopup.module.css';
import Image from 'next/image';
import { PatientLevelDataContainer } from '../PatientLevelData/PatientLevelDataContainer';

export default function PatientInformationPopup({ selectedPatient, details, status, onClose, onViewReport }) {

    console.log("karan status", details.data[0].StatusPrespcription)

    return (
        <div className={styles.container}>
            <div className={styles.inner_container}>
                <div className={styles.patient_information_cont}>
                    <div className={styles.information_header}>
                        <div className={styles.head}>
                            <Image src="/images/report.png" height={28} width={26} alt='image' />
                            <h3>Patient Information</h3>
                        </div>
                        <div>
                            <div className={` ${details.data[0].StatusPrespcription === "Celevida_Onboarded"
                                ? styles.status_onboarded
                                : details.data[0].StatusPrespcription === "Celevida_Nurture"
                                    ? styles.status__nurture
                                    : styles.defaultStatus
                                }`}>
                                {details.data[0].StatusPrespcription === "Celevida_Onboarded"
                                    ? "Prescribed"
                                    : details.data[0].StatusPrespcription === "Celevida_Nurture"
                                        ? "Nurture"
                                        : "N/A"}
                            </div>
                        </div>
                    </div>

                    <div className={styles.personal_details}>
                        <p>Name : {details.data[0].Last_Name}</p>
                        <p>Age : {details.data[0].Age}</p>
                        <p>Weight : {details.data[0].Body_Weight_kg}</p>
                        <p>Height : {details.data[0].Height}</p>
                        <p>Gender : {details.data[0].Genders}</p>
                        <p>Phone : {details.data[0].Phone}</p>
                    </div>
                </div>
                <div className={styles.coach_details_cont}>
                    <div className={styles.coach_name}>
                        <Image src='/images/person.png' height={20} width={20} alt='image' />
                        <p>Coach</p>
                    </div>
                    <div>
                        <p>Name : {details.data[0].Owner.name}</p>
                        <p><span style={{ color: "#D12C2E" }}>Upcoming Call on</span> {details.data[0].Appointment_Date}</p>
                    </div>
                </div>
                <PatientLevelDataContainer />
                <div className={styles.btn_container}>
                    <button onClick={onClose}>Close</button>
                    <button onClick={onViewReport}>View Report</button> {/* 👈 trigger parent handler */}
                </div>
            </div>
        </div>
    );
}
