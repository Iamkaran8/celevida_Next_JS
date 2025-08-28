"use client";

import styles from '@/styles/popup/patientInformationPopup.module.css';
import Image from 'next/image';

export default function PatientInformationPopup({ name, age, weight, height, gender, phone, status }) {
    return (
        <div className={styles.container}>
            <div className={styles.inner_container}>
                <div className={styles.patient_information_cont}>
                    <div className={styles.information_header}>
                        <div className={styles.head}>
                            <Image src="/images/report.png" height={28} width={26} alt='image' />  <h3>Patient Information</h3>
                        </div>
                        <div>
                            <div className={styles.status_onboarded}>
                                Prescribed
                            </div>
                        </div>
                    </div>
                    <div className={styles.personal_details}>
                        <div>
                            <p>Name : {name}</p>
                            <p>Age : {age}</p>
                            <p>Weight : {weight}</p>
                            <p>Height : {height}</p>
                            <p>Gender : {gender}</p>
                            <p>Phone : {phone}</p>
                        </div>
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
                    <button>View Report</button>
                </div>
            </div>


        </div>
    );
}



// "use client";

// import styles from '@/styles/popup/patientInformationPopup.module.css';
// import Image from 'next/image';

// export default function PatientInformationPopup({ patient, onClose }) {
//     return (
//         <div className={styles.container}>
//             <div className={styles.inner_container}>
//                 <div className={styles.patient_information_cont}>
//                     <div className={styles.information_header}>
//                         <div className={styles.head}>
//                             <Image src="/images/report.png" alt='image' height={28} width={26} />
//                             <h3>Patient Information</h3>
//                         </div>
//                         <div>
//                             <div className={styles.status_onboarded}>
//                                 {patient.status === 'Celevida_Onboarded' ? 'Prescribed' : 'Nurture'}
//                             </div>
//                         </div>
//                     </div>
//                     <div className={styles.personal_details}>
//                         <div>
//                             <p>Name : {patient.patient_name}</p>
//                             <p>Age : {patient.age ?? "22 years"}</p>
//                             <p>Weight : {patient.weight ?? "65kg"}</p>
//                             <p>Height : {patient.height ?? "5'10\""}</p>
//                             <p>Gender : {patient.gender ?? "Male"}</p>
//                             <p>Phone : {patient.phone_number}</p>
//                         </div>
//                     </div>
//                 </div>

//                 <div className={styles.coach_details_cont}>
//                     <div className={styles.coach_name}>
//                         <Image src='/images/person.png' height={20} width={20} />
//                         <p>Coach</p>
//                     </div>
//                     <div>
//                         <p>Name : {patient.coach_name ?? "John"}</p>
//                         <p><span style={{ color: "#D12C2E" }}>Upcoming Call on</span> {patient.upcoming_call_date ?? "22/08/2025"}</p>
//                     </div>
//                 </div>

//                 <div className={styles.btn_container}>
//                     <button onClick={onClose}>Close</button>
//                     <button>View Report</button>
//                 </div>
//             </div>
//         </div>
//     );
// }
