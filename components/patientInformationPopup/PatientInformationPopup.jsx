
"use client";

import styles from '@/styles/popup/patientInformationPopup.module.css';
import Image from 'next/image';

export default function PatientInformationPopup({ name, age, weight, height, gender, phone, status, onClose }) {
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
                        <p>Name : {name}</p>
                        <p>Age : {age ?? "22 years"}</p>
                        <p>Weight : {weight ?? "65kg"}</p>
                        <p>Height : {height ?? "5'10\""}</p>
                        <p>Gender : {gender ?? "Male"}</p>
                        <p>Phone : {phone}</p>
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

                <div className={styles.btn_container}>
                    <button onClick={onClose}>Close</button>
                    <button>View Report</button>
                </div>
            </div>
        </div>
    );
}
