
"use client";

import styles from '../../styles/popup/patientInformationPopup.module.css';
import Image from 'next/image';
import { PatientLevelDataContainer } from '../PatientLevelData/PatientLevelDataContainer';

export default function PatientInformationPopup({ selectedPatient, details, status, onClose, onViewReport }) {


    console.log("senthil", details.data[0])
    console.log(details.data[0].Last_Name)
    console.log(selectedPatient)

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
                            <div className={` ${status === "Celevida_Onboarded"
                                ? styles.status_onboarded
                                : status === "Celevida_Nurture"
                                    ? styles.status__nurture
                                    : styles.defaultStatus
                                }`}>
                                {status === "Celevida_Onboarded"
                                    ? "Prescribed"
                                    : status === "Celevida_Nurture"
                                        ? "Nurture"
                                        : "N/A"}
                            </div>
                        </div>
                    </div>

                    <div className={styles.personal_details}>
                        <p>Name : {details.data[0].Last_Name}</p>
                        <p>Age : {details.data[0].Age}</p>
                        <p>Weight : {details.data[0].Weight}</p>
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
                        <p>Name : John</p>
                        <p><span style={{ color: "#D12C2E" }}>Upcoming Call on</span> 22/08/2025</p>
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
